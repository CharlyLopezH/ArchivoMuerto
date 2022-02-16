using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArchivoMuertoAPI.DTOs
{
    public class CajasPutGetDTO
    {
        public CajaDTO Caja { get; set; }
        public List<GeneroDTO> GenerosSeleccionados { get; set; }
        public List<GeneroDTO> GenerosNoSeleccionados { get; set; }
        public List<CineDTO> CinesSeleccionados { get; set; }
        public List<CineDTO> CinesNoSeleccionados { get; set; }
        public List<CajaActorDTO> Actores { get; set; }
    }
}