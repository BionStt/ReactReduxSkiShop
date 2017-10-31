using System.Collections.Generic;

namespace SkiShopReact.Models
{
    public class IdealFor
    {
        public int IdealForId { get; set; }

        public string IdealForWhat { get; set; }

        public virtual ICollection<StyleIdealFor> StyleIdealFors { get; set; }
    }
}
