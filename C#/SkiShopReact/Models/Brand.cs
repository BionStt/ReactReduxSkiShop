using System.Collections.Generic;

namespace SkiShopReact.Models
{
    public class Brand
    {
        public int BrandId { get; set; }
        public string BrandName { get; set; }
        public string MadeIn { get; set; }

        public virtual ICollection<Style> Styles { get; set; }
    }
}
