using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SkiShopReact.ViewModels;
using SkiShopReact.DAL;
using SkiShopReact.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SkiShopReact.Controllers
{
    public class HomeController : Controller
    {
        private SkiShopContext context;

        public HomeController(SkiShopContext passedContext)
        {
            context = passedContext;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {


            return View();
        }

        public IActionResult Error()
        {
            return View();
        }

        private List<string> mostPopularNonClearance = new List<string>(
            new[] { "123463", "223461", "223465" });
        private List<string> mostPopularClearance = new List<string>(
            new[] { "123458", "223466", "323464" });

        [HttpGet]
        [Route("/skishop/getPopularClearance")]
        public IActionResult GetStylesPopularClearance()
        {
            using (UnitOfWork<Style> uow = new UnitOfWork<Style>(context, false))
            {
                var styleList = uow.Repository.GetAll(
                        s => mostPopularNonClearance.Contains(s.StyleNo))
                    .Select(s => new
                    {
                        s.StyleNo,
                        s.StyleName,
                        s.BrandName,
                        s.Gender,
                        s.CategoryName,
                        s.ImageSmall,
                        s.PriceCurrent,
                        s.PriceRegular
                    }).ToList();

                var clearances = uow.Repository.GetAll(
                        s => mostPopularClearance.Contains(s.StyleNo))
                    .Select(s => new
                    {
                        s.StyleNo,
                        s.StyleName,
                        s.BrandName,
                        s.Gender,
                        s.CategoryName,
                        s.ImageSmall,
                        s.PriceCurrent,
                        s.PriceRegular
                    }).ToList();

                styleList.AddRange(clearances);

                return Json(styleList);
            }
        }

        [HttpGet]
        [Route("/skishop/getCategories")]
        public IActionResult GetCategories()
        {
            using (UnitOfWork<Category> uow = new UnitOfWork<Category>(context, false))
            {
                var categories = uow.Repository.GetAll().Select(c => new
                {
                    c.CategoryId,
                    c.CategoryName
                }).ToList();

                return Json(categories);
            }

        }

        [HttpGet]
        [Route("/skishop/getByCategory/{category}")]
        public IActionResult GetStylesByCategory(string category)
        {
            using (UnitOfWork<Style, StyleIdealFor> uow = new UnitOfWork<Style, StyleIdealFor>(context, false))
            {
                var styles = uow.RepositoryMany.GetAllEager(s => s.StyleIdealFors,
                        si => si.IdealFor, s => s.CategoryName == category)
                    .ToList();

                List<StylesByCategoryVM> stylesList = new List<StylesByCategoryVM>();

                foreach (var style in styles)
                {
                    StylesByCategoryVM stylesByCategory = new StylesByCategoryVM
                    {
                        StyleNo = style.StyleNo,
                        StyleName = style.StyleName,
                        CategoryName = style.CategoryName,
                        BrandName = style.BrandName,
                        Gender = style.Gender,
                        PriceCurrent = style.PriceCurrent,
                        PriceRegular = style.PriceRegular,
                        ImageSmall = style.ImageSmall
                    };

                    foreach (StyleIdealFor idealfor in style.StyleIdealFors)
                    {
                        if (stylesByCategory.IdealFors == null)
                        {
                            stylesByCategory.IdealFors = new List<string>();
                        }
                        stylesByCategory.IdealFors.Add(idealfor.IdealFor.IdealForWhat);
                    }

                    stylesList.Add(stylesByCategory);
                }

                return Json(stylesList);
            }
        }

        [HttpGet]
        [Route("/skishop/getStyleDetail/{styleNo}")]
        public IActionResult GetStyle(string styleNo)
        {
            using (UnitOfWork<Style> uow = new UnitOfWork<Style>(context))
            {

                Style style = uow.Repository.GetEager(s => s.Skus, s => s.StyleNo == styleNo);

                StyleVM styleVm = new StyleVM();
                styleVm.StyleNo = style.StyleNo;
                styleVm.StyleName = style.StyleName;
                styleVm.BrandName = style.BrandName;
                styleVm.CategoryName = style.CategoryName;
                styleVm.Gender = style.Gender;
                styleVm.PriceCurrent = style.PriceCurrent;
                styleVm.PriceRegular = style.PriceRegular;
                styleVm.ImageBig = style.ImageBig;

                foreach (Sku sku in style.Skus)
                {
                    if (styleVm.SkuNos == null)
                    {
                        styleVm.SkuNos = new List<string>();
                        styleVm.Sizes = new List<string>();
                        styleVm.Quantities = new List<int>();
                    }
                    styleVm.SkuNos.Add(sku.SkuNo);
                    styleVm.Sizes.Add(sku.Size);
                    styleVm.Quantities.Add(sku.Quantity);
                }

                return Json(styleVm);
            }
        }

        [HttpGet]
        [Route("/skishop/checkQuantities/{skus}")]
        public IActionResult CheckQuantities(string[] skus)
        {
            using (UnitOfWork<Sku> uow = new UnitOfWork<Sku>(context, false))
            {
                List<string> skusList = new List<string>(skus[0].Split(','));

                var skuQuantities = uow.Repository.GetAll(s =>
                        skusList.IndexOf(s.SkuNo) > -1)
                    .Select(s => new
                    {
                        s.SkuNo,
                        s.Quantity
                    }).ToList();

                return Json(skuQuantities);
            }
        }

        [HttpPost]
        [Route("/skishop/postOrder")]
        public IActionResult PostOrder([FromBody] Order order)
        {
            using (UnitOfWork<Order> uow = new UnitOfWork<Order>(context, false))
            {
                // save the new order
                order.TimeCreate = DateTime.Now;
                uow.Repository.Add(order);
                uow.SaveChanges();

                OrderVM orderVm = new OrderVM();
                orderVm.StyleNos = new List<string>();
                using (UnitOfWork<Sku> uowsku = new UnitOfWork<Sku>(context, false))
                {
                    List<Sku> skulList = new List<Sku>(); // ???
                    foreach (var item in order.OrderItems)
                    {
                        var sku = uowsku.Repository.Get(s => s.SkuNo == item.SkuNo);
                        sku.Quantity -= item.Quantity;
                        uowsku.Repository.Update(sku);
                        skulList.Add(sku); // ???
                        orderVm.StyleNos.Add(sku.StyleNo);
                    }
                    uowsku.SaveChanges();
                }


                Order newOrder = uow.Repository.Get(o => o.TimeCreate == order.TimeCreate
                                                         && o.Name == order.Name);

                orderVm.OrderId = newOrder.OrderId;

                return Json(orderVm);
            }
        }

        [HttpGet]
        [Route("/skishop/getOrders")]
        public IActionResult GetOrders()
        {
            using (UnitOfWork<Order> uow = new UnitOfWork<Order>(context, false))
            {
                var orders = uow.Repository.GetAll().Select(o => new
                {
                    o.OrderId,
                    o.Name,
                    o.City,
                    o.TotalValue,
                    o.TimeCreate
                }).ToList();

                List<OrderGetVM> ordersVM = new List<OrderGetVM>();

                foreach (var order in orders)
                {
                    OrderGetVM orderGet = new OrderGetVM();
                    orderGet.OrderId = order.OrderId;
                    orderGet.Name = order.Name;
                    orderGet.City = order.City;
                    orderGet.TotalValue = order.TotalValue;
                    orderGet.Date = order.TimeCreate.ToString("MMM dd yyyy");
                    ordersVM.Add(orderGet);
                }

                return Json(ordersVM);
            }
        }

        [HttpGet]
        [Route("/skishop/getOrderDetail/{orderId}")]
        public IActionResult GetOrderDetail(int orderId)
        {
            using (UnitOfWork<OrderItem> uow = new UnitOfWork<OrderItem>(context, false))
            {
                var orderItems = uow.Repository.GetAll(oi => oi.OrderId == orderId).Select(oi => new
                {
                    oi.SkuNo,
                    oi.Skis,
                    oi.Size,
                    oi.Price,
                    oi.Quantity,
                    oi.Subtotal
                }).ToList();

                return Json(orderItems);
            }
        }

    }
}
