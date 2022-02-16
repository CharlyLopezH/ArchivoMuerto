using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ArchivoMuertoAPI.Utilidades;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ArchivoMuertoAPI.DTOs
{
    public class CajaCreacionDTO
    {
        [Required]
        [StringLength(maximumLength: 300)]
        public string Titulo { get; set; }
        public string Resumen { get; set; }
        public string Trailer { get; set; }
        public bool EnCines { get; set; }
        public DateTime FechaLanzamiento { get; set; }
        public IFormFile Poster { get; set; }
        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> GenerosIds { get; set; }
        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> CinesIds { get; set; }
        [ModelBinder(BinderType = typeof(TypeBinder<List<ActorCajaCreacionDTO>>))]
        public List<ActorCajaCreacionDTO> Actores { get; set; }

    }
}
