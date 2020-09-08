using System;
using Entities.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Entities
{
    public partial class RepositoryContext : IdentityDbContext<User>
    {
        public RepositoryContext()
        {
        }

        public RepositoryContext(DbContextOptions<RepositoryContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CatProduct> CatProduct { get; set; }
        public virtual DbSet<CatProductParameters> CatProductParameters { get; set; }
        public virtual DbSet<CatStatus> CatStatus { get; set; }
        public virtual DbSet<Color> Color { get; set; }
        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<CustomerActivation> CustomerActivation { get; set; }
        public virtual DbSet<CustomerOffer> CustomerOffer { get; set; }
        public virtual DbSet<Location> Location { get; set; }
        public virtual DbSet<OfferType> OfferType { get; set; }
        public virtual DbSet<Offers> Offers { get; set; }
        public virtual DbSet<Parameters> Parameters { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<ProductCustomerComments> ProductCustomerComments { get; set; }
        public virtual DbSet<ProductCustomerRate> ProductCustomerRate { get; set; }
        public virtual DbSet<ProductImage> ProductImage { get; set; }
        public virtual DbSet<ProductMeter> ProductMeter { get; set; }
        public virtual DbSet<ProductOffer> ProductOffer { get; set; }
        public virtual DbSet<ProductParameters> ProductParameters { get; set; }
        public virtual DbSet<Seller> Seller { get; set; }
        public virtual DbSet<SellerCatProduct> SellerCatProduct { get; set; }
        public virtual DbSet<Status> Status { get; set; }
        public virtual DbSet<StatusType> StatusType { get; set; }
        public virtual DbSet<Systems> Systems { get; set; }
        public virtual DbSet<Tables> Tables { get; set; }
        public virtual DbSet<Slider> Slider { get; set; }
        public virtual DbSet<SliderPlaceType> SliderPlaceType { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<CatProduct>(entity =>
            {
                entity.HasIndex(e => e.Pid);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Icon).HasMaxLength(256);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.Pid).HasColumnName("PID");

                entity.Property(e => e.Url)
                    .HasColumnName("URL")
                    .HasMaxLength(256);

                entity.HasOne(d => d.P)
                    .WithMany(p => p.InverseP)
                    .HasForeignKey(d => d.Pid)
                    .HasConstraintName("FK_CatProduct_CatProduct");
            });

            modelBuilder.Entity<CatProductParameters>(entity =>
            {
                entity.HasIndex(e => e.CatProductId);

                entity.HasIndex(e => e.ParametersId);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CatProductId).HasColumnName("CatProductID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.ParametersId).HasColumnName("ParametersID");

                entity.HasOne(d => d.CatProduct)
                    .WithMany(p => p.CatProductParameters)
                    .HasForeignKey(d => d.CatProductId)
                    .HasConstraintName("FK_CatProductParameters_CatProduct");

                entity.HasOne(d => d.Parameters)
                    .WithMany(p => p.CatProductParameters)
                    .HasForeignKey(d => d.ParametersId)
                    .HasConstraintName("FK_CatProductParameters_Parameters");
            });

            modelBuilder.Entity<CatStatus>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.Color).HasMaxLength(64);

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Name).HasMaxLength(64);
            });

            modelBuilder.Entity<Color>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.ColorCode).HasMaxLength(32);

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Name).HasMaxLength(64);
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasIndex(e => e.FinalStatusId);

                entity.HasIndex(e => e.LocationId);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Address).HasMaxLength(1024);

                entity.Property(e => e.Bdate).HasColumnName("BDate");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Email).HasMaxLength(64);

                entity.Property(e => e.FinalStatusId).HasColumnName("FinalStatusID");

                entity.Property(e => e.Fname).HasMaxLength(32);

                entity.Property(e => e.LocationId).HasColumnName("LocationID");

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Name).HasMaxLength(32);

                entity.Property(e => e.ProfileImageHurl)
                    .HasColumnName("ProfileImageHURL")
                    .HasMaxLength(514);

                entity.Property(e => e.ProfileImageUrl)
                    .HasColumnName("ProfileImageURL")
                    .HasMaxLength(512);

                entity.Property(e => e.UserId)
                    .HasColumnName("UserID")
                    .HasMaxLength(450);

                entity.HasOne(d => d.FinalStatus)
                    .WithMany(p => p.Customer)
                    .HasForeignKey(d => d.FinalStatusId)
                    .HasConstraintName("FK_Customer_Status");

                entity.HasOne(d => d.Location)
                    .WithMany(p => p.Customer)
                    .HasForeignKey(d => d.LocationId)
                    .HasConstraintName("FK_Customer_Location");
            });

            modelBuilder.Entity<CustomerActivation>(entity =>
            {
                entity.HasIndex(e => e.CustomerId);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.CustomerActivation)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_CustomerActivation_Customer");
            });

            modelBuilder.Entity<CustomerOffer>(entity =>
            {
                entity.HasIndex(e => e.CustomerId);

                entity.HasIndex(e => e.OfferId);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.OfferCode).HasMaxLength(32);

                entity.Property(e => e.OfferId).HasColumnName("OfferID");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.CustomerOffer)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_CustomerOffer_Customer");

                entity.HasOne(d => d.Offer)
                    .WithMany(p => p.CustomerOffer)
                    .HasForeignKey(d => d.OfferId)
                    .HasConstraintName("FK_UserOffer_Offers");
            });

            modelBuilder.Entity<Location>(entity =>
            {
                entity.HasIndex(e => e.CountryId);

                entity.HasIndex(e => e.Pid);

                entity.HasIndex(e => e.ProvinceId);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.CountryId).HasColumnName("CountryID");

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.EnName).HasMaxLength(64);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Name).HasMaxLength(64);

                entity.Property(e => e.Pid).HasColumnName("PID");

                entity.Property(e => e.ProvinceId).HasColumnName("ProvinceID");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.InverseCountry)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("FK_Location_Location1");

                entity.HasOne(d => d.P)
                    .WithMany(p => p.InverseP)
                    .HasForeignKey(d => d.Pid)
                    .HasConstraintName("FK_Location_Location");

                entity.HasOne(d => d.Province)
                    .WithMany(p => p.InverseProvince)
                    .HasForeignKey(d => d.ProvinceId)
                    .HasConstraintName("FK_Location_Location2");
            });

            modelBuilder.Entity<OfferType>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Name).HasMaxLength(256);
            });

            modelBuilder.Entity<Offers>(entity =>
            {
                entity.HasIndex(e => e.OfferType);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.OfferCode).HasMaxLength(32);

                entity.HasOne(d => d.OfferTypeNavigation)
                    .WithMany(p => p.Offers)
                    .HasForeignKey(d => d.OfferType)
                    .HasConstraintName("FK_Offers_OfferType");
            });

            modelBuilder.Entity<Parameters>(entity =>
            {
                entity.HasIndex(e => e.Pid);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Name).HasMaxLength(512);

                entity.Property(e => e.Pid).HasColumnName("PID");

                entity.HasOne(d => d.P)
                    .WithMany(p => p.InverseP)
                    .HasForeignKey(d => d.Pid)
                    .HasConstraintName("FK_Parameters_Parameters");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasIndex(e => e.CatProductId);

                entity.HasIndex(e => e.FinalStatusId);

                entity.HasIndex(e => e.ProductMeterId);

                entity.HasIndex(e => e.SellerId);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CatProductId).HasColumnName("CatProductID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.CoverImageHurl)
                    .HasColumnName("CoverImageHURL")
                    .HasMaxLength(514);

                entity.Property(e => e.CoverImageUrl)
                    .HasColumnName("CoverImageURL")
                    .HasMaxLength(512);

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.EnName).HasMaxLength(256);

                entity.Property(e => e.FinalStatusId).HasColumnName("FinalStatusID");

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.ProductMeterId).HasColumnName("ProductMeterID");

                entity.Property(e => e.SellerId).HasColumnName("SellerID");

                entity.HasOne(d => d.CatProduct)
                    .WithMany(p => p.Product)
                    .HasForeignKey(d => d.CatProductId)
                    .HasConstraintName("FK_Product_CatProduct");

                entity.HasOne(d => d.FinalStatus)
                    .WithMany(p => p.Product)
                    .HasForeignKey(d => d.FinalStatusId)
                    .HasConstraintName("FK_Product_Status");

                entity.HasOne(d => d.ProductMeter)
                    .WithMany(p => p.Product)
                    .HasForeignKey(d => d.ProductMeterId)
                    .HasConstraintName("FK_Product_ProductMeter");

                entity.HasOne(d => d.Seller)
                    .WithMany(p => p.Product)
                    .HasForeignKey(d => d.SellerId)
                    .HasConstraintName("FK_Product_Seller");
            });

            modelBuilder.Entity<ProductCustomerComments>(entity =>
            {
                entity.HasIndex(e => e.CustomerId);

                entity.HasIndex(e => e.ProductId);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.ProductCustomerComments)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_ProductCustomerComments_Customer");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductCustomerComments)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_ProductUserComments_Product");
            });

            modelBuilder.Entity<ProductCustomerRate>(entity =>
            {
                entity.HasIndex(e => e.CustomerId);

                entity.HasIndex(e => e.ProductId);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.ProductCustomerRate)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_ProductCustomerRate_Customer");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductCustomerRate)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_ProductUserRate_Product");
            });

            modelBuilder.Entity<ProductImage>(entity =>
            {
                entity.HasIndex(e => e.ColorId);

                entity.HasIndex(e => e.ProductId);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.ColorId).HasColumnName("ColorID");

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.ImageHurl)
                    .HasColumnName("ImageHURL")
                    .HasMaxLength(514);

                entity.Property(e => e.ImageUrl)
                    .HasColumnName("ImageURL")
                    .HasMaxLength(512);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.HasOne(d => d.Color)
                    .WithMany(p => p.ProductImage)
                    .HasForeignKey(d => d.ColorId)
                    .HasConstraintName("FK_ProductImage_Color");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductImage)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_ProductImage_Product");
            });

            modelBuilder.Entity<ProductMeter>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Name).HasMaxLength(128);
            });

            modelBuilder.Entity<ProductOffer>(entity =>
            {
                entity.HasIndex(e => e.OfferId);

                entity.HasIndex(e => e.ProductId);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.OfferCode).HasMaxLength(32);

                entity.Property(e => e.OfferId).HasColumnName("OfferID");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.HasOne(d => d.Offer)
                    .WithMany(p => p.ProductOffer)
                    .HasForeignKey(d => d.OfferId)
                    .HasConstraintName("FK_ProductOffer_Offers");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductOffer)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_ProductOffer_Product");
            });

            modelBuilder.Entity<ProductParameters>(entity =>
            {
                entity.HasIndex(e => e.CatProductParameters);

                entity.HasIndex(e => e.ProductId);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.Value).HasMaxLength(512);

                entity.HasOne(d => d.CatProductParametersNavigation)
                    .WithMany(p => p.ProductParameters)
                    .HasForeignKey(d => d.CatProductParameters)
                    .HasConstraintName("FK_ProductParameters_CatProductParameters");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductParameters)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_ProductParameters_Product");
            });

            modelBuilder.Entity<Slider>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.ImageHurl)
                    .HasColumnName("ImageHURL")
                    .HasMaxLength(514);

                entity.Property(e => e.ImageUrl)
                    .HasColumnName("ImageURL")
                    .HasMaxLength(512);

                entity.Property(e => e.LinkUrl)
                    .HasColumnName("LinkURL")
                    .HasMaxLength(256);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Rorder).HasColumnName("ROrder");

                entity.Property(e => e.SliderPlaceTypeId).HasColumnName("SliderPlaceTypeID");

                entity.Property(e => e.Title).HasMaxLength(512);

                entity.HasOne(d => d.SliderPlaceType)
                    .WithMany(p => p.Slider)
                    .HasForeignKey(d => d.SliderPlaceTypeId)
                    .HasConstraintName("FK_Slider_SliderPlaceType");
            });

            modelBuilder.Entity<SliderPlaceType>(entity =>
            {
                entity.HasIndex(e => e.Rkey)
                    .HasName("IX_SliderPlaceType")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Name).HasMaxLength(128);
            });

            modelBuilder.Entity<Status>(entity =>
            {
                entity.HasIndex(e => e.CatStatusId);

                entity.HasIndex(e => e.StatusTypeId);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CatStatusId).HasColumnName("CatStatusID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.Color).HasMaxLength(64);

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Name).HasMaxLength(64);

                entity.Property(e => e.NextStatusId).HasColumnName("NextStatusID");

                entity.Property(e => e.StatusTypeId).HasColumnName("StatusTypeID");

                entity.HasOne(d => d.CatStatus)
                    .WithMany(p => p.Status)
                    .HasForeignKey(d => d.CatStatusId)
                    .HasConstraintName("FK_Status_CatStatus");

                entity.HasOne(d => d.StatusType)
                    .WithMany(p => p.Status)
                    .HasForeignKey(d => d.StatusTypeId)
                    .HasConstraintName("FK_Status_StatusType");
            });

            modelBuilder.Entity<StatusType>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Name).HasMaxLength(64);
            });

            modelBuilder.Entity<Systems>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Name).HasMaxLength(128);
            });

            modelBuilder.Entity<Tables>(entity =>
            {
                entity.HasIndex(e => e.CatStatusId);

                entity.HasIndex(e => e.SystemId);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CatStatusId).HasColumnName("CatStatusID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Name).HasMaxLength(64);

                entity.Property(e => e.SystemId).HasColumnName("SystemID");

                entity.HasOne(d => d.CatStatus)
                    .WithMany(p => p.Tables)
                    .HasForeignKey(d => d.CatStatusId)
                    .HasConstraintName("FK_Tables_CatStatus");

                entity.HasOne(d => d.System)
                    .WithMany(p => p.Tables)
                    .HasForeignKey(d => d.SystemId)
                    .HasConstraintName("FK_Tables_Systems");
            });

            modelBuilder.Entity<Slider>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.ImageHurl)
                    .HasColumnName("ImageHURL")
                    .HasMaxLength(514);

                entity.Property(e => e.ImageUrl)
                    .HasColumnName("ImageURL")
                    .HasMaxLength(512);

                entity.Property(e => e.LinkUrl)
                    .HasColumnName("LinkURL")
                    .HasMaxLength(256);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Rorder).HasColumnName("ROrder");

                entity.Property(e => e.SliderPlaceTypeId).HasColumnName("SliderPlaceTypeID");

                entity.Property(e => e.Title).HasMaxLength(512);

                entity.HasOne(d => d.SliderPlaceType)
                    .WithMany(p => p.Slider)
                    .HasForeignKey(d => d.SliderPlaceTypeId)
                    .HasConstraintName("FK_Slider_SliderPlaceType");
            });

            modelBuilder.Entity<SliderPlaceType>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cdate).HasColumnName("CDate");

                entity.Property(e => e.CuserId)
                    .HasColumnName("CUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.DaUserId)
                    .HasColumnName("DaUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Ddate).HasColumnName("DDate");

                entity.Property(e => e.DuserId)
                    .HasColumnName("DUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Mdate).HasColumnName("MDate");

                entity.Property(e => e.MuserId)
                    .HasColumnName("MUserID")
                    .HasMaxLength(450);

                entity.Property(e => e.Name).HasMaxLength(128);
            });


        }

       
    }
}
