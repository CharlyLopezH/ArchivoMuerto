using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ArchivoMuertoAPI.DTOs
{
    public class RatingDTO
    {
        public int CajaId { get; set; }
        [Range(1, 5)]
        public int Puntuacion { get; set; }
    }
}