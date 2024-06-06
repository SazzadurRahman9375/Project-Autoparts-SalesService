using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APSS.Lib.ViewModels
{
    public class PorductCategoryDTO
    {
        public int ProductCategoryId { get; set; }
        public string ProductCategoryName { get; set; } = default!;
        public int VehicleTypeId { get; set; }
        public string VehicleTypeName { get; set; } = default!;

    }
}
