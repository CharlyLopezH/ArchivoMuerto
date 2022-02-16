using System.Collections.Generic;

namespace ArchivoMuertoAPI.DTOs
{
    public class CajasPostGetDTO
    {
        public List<GeneroDTO> Generos { get; set; }
        public List<CineDTO> Cines { get; set; }
    }
}
