using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ArchivoMuertoAPI.Entidades
{
    public class Rating
    {
        public int Id { get; set; }
        [Range(1, 5)]
        public int Puntuacion { get; set; }
        public int CajaId { get; set; }
        public Caja Caja { get; set; }
        public string UsuarioId { get; set; }
        public IdentityUser Usuario { get; set; }
    }
}