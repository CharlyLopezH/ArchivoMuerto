using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArchivoMuertoAPI.DTOs
{
    public class LandingPageDTO
    {
        public List<CajaDTO> EnCines { get; set; }
        public List<CajaDTO> ProximosEstrenos { get; set; }
    }
}