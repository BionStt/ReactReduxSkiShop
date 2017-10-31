using System.Collections.Generic;

namespace SkiShopReact.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        public virtual ICollection<Style> Styles { get; set; }
    }
}
