using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ArchivoMuertoAPI.Entidades
{
    public class Caja
    {
        public int Id { get; set; } 
        [Required]
        [StringLength(maximumLength: 300, MinimumLength = 2)]
        public string Titulo { get; set; }
        public string Resumen { get; set; }
        public string Trailer { get; set; }
        public bool EnCines { get; set; }
        public DateTime FechaLanzamiento { get; set; }
        public string Poster { get; set; }
        public List<CajasGeneros> CajasGeneros { get; set; }
        public List<CajasActores> CajasActores { get; set; }
        public List<CajasCines> CajasCines { get;set; }          
    }
}
