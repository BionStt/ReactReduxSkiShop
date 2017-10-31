using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using SkiShopReact.DAL;

namespace SkiShopReact.Migrations
{
    [DbContext(typeof(SkiShopContext))]
    partial class SkiShopContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SkiShopReact.Models.Brand", b =>
                {
                    b.Property<int>("BrandId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("BrandName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("MadeIn")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("BrandId");

                    b.ToTable("Brands");
                });

            modelBuilder.Entity("SkiShopReact.Models.Category", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CategoryName")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.HasKey("CategoryId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("SkiShopReact.Models.IdealFor", b =>
                {
                    b.Property<int>("IdealForId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("IdealForWhat")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("IdealForId");

                    b.ToTable("IdealFors");
                });

            modelBuilder.Entity("SkiShopReact.Models.Order", b =>
                {
                    b.Property<int>("OrderId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("City")
                        .IsRequired();

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<string>("Postcode")
                        .IsRequired();

                    b.Property<string>("Province")
                        .IsRequired();

                    b.Property<string>("Street")
                        .IsRequired();

                    b.Property<DateTime>("TimeCreate");

                    b.Property<decimal>("TotalValue")
                        .HasColumnType("decimal(8,2)");

                    b.HasKey("OrderId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("SkiShopReact.Models.OrderItem", b =>
                {
                    b.Property<int>("OrderItemId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("OrderId");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(8,2)");

                    b.Property<int>("Quantity");

                    b.Property<string>("Size")
                        .IsRequired();

                    b.Property<string>("Skis")
                        .IsRequired();

                    b.Property<string>("SkuNo")
                        .IsRequired();

                    b.Property<decimal>("Subtotal")
                        .HasColumnType("decimal(8,2)");

                    b.HasKey("OrderItemId");

                    b.HasIndex("OrderId");

                    b.ToTable("OrderItems");
                });

            modelBuilder.Entity("SkiShopReact.Models.Sku", b =>
                {
                    b.Property<int>("SkuId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Quantity");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<string>("Size")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("SkuNo")
                        .IsRequired()
                        .HasMaxLength(8);

                    b.Property<string>("StyleNo")
                        .IsRequired();

                    b.HasKey("SkuId");

                    b.HasIndex("SkuNo");

                    b.HasIndex("StyleNo");

                    b.ToTable("Skus");
                });

            modelBuilder.Entity("SkiShopReact.Models.StockLocation", b =>
                {
                    b.Property<int>("StockLocationId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Slot")
                        .HasMaxLength(10);

                    b.Property<int>("StyleId");

                    b.Property<string>("Zone")
                        .HasMaxLength(10);

                    b.HasKey("StockLocationId");

                    b.HasIndex("StyleId")
                        .IsUnique();

                    b.ToTable("StockLocations");
                });

            modelBuilder.Entity("SkiShopReact.Models.Style", b =>
                {
                    b.Property<int>("StyleId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("BrandName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("CategoryName")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<string>("ImageBig")
                        .IsRequired()
                        .HasMaxLength(300);

                    b.Property<string>("ImageSmall")
                        .IsRequired()
                        .HasMaxLength(300);

                    b.Property<decimal>("PriceCurrent")
                        .HasColumnType("decimal(8,2)");

                    b.Property<decimal>("PriceRegular")
                        .HasColumnType("decimal(8,2)");

                    b.Property<string>("StyleName")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<string>("StyleNo")
                        .IsRequired()
                        .HasMaxLength(6);

                    b.HasKey("StyleId");

                    b.HasIndex("BrandName");

                    b.HasIndex("CategoryName");

                    b.ToTable("Styles");
                });

            modelBuilder.Entity("SkiShopReact.Models.StyleIdealFor", b =>
                {
                    b.Property<int>("StyleId");

                    b.Property<int>("IdealForId");

                    b.HasKey("StyleId", "IdealForId");

                    b.HasIndex("IdealForId");

                    b.ToTable("StyleIdealFors");
                });

            modelBuilder.Entity("SkiShopReact.Models.OrderItem", b =>
                {
                    b.HasOne("SkiShopReact.Models.Order", "Order")
                        .WithMany("OrderItems")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SkiShopReact.Models.Sku", b =>
                {
                    b.HasOne("SkiShopReact.Models.Style", "Style")
                        .WithMany("Skus")
                        .HasForeignKey("StyleNo")
                        .HasPrincipalKey("StyleNo")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SkiShopReact.Models.StockLocation", b =>
                {
                    b.HasOne("SkiShopReact.Models.Style", "Style")
                        .WithOne("StockLocation")
                        .HasForeignKey("SkiShopReact.Models.StockLocation", "StyleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SkiShopReact.Models.Style", b =>
                {
                    b.HasOne("SkiShopReact.Models.Brand", "Brand")
                        .WithMany("Styles")
                        .HasForeignKey("BrandName")
                        .HasPrincipalKey("BrandName")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SkiShopReact.Models.Category", "Category")
                        .WithMany("Styles")
                        .HasForeignKey("CategoryName")
                        .HasPrincipalKey("CategoryName")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SkiShopReact.Models.StyleIdealFor", b =>
                {
                    b.HasOne("SkiShopReact.Models.IdealFor", "IdealFor")
                        .WithMany("StyleIdealFors")
                        .HasForeignKey("IdealForId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SkiShopReact.Models.Style", "Style")
                        .WithMany("StyleIdealFors")
                        .HasForeignKey("StyleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
