using ArchivoMuertoAPI.Validaciones;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ArchivoMuertoAPI.Entidades
{
    public class Genero
    {
        //internal object id;

        public int Id { get; set; }
        [Required(ErrorMessage = "El campo {0} es requerido")]
        [StringLength(maximumLength: 50, ErrorMessage = "El campo {0} no debe ser mayor a 50 caracteres")]
        [PrimeraLetraMayuscula]
        public string Nombre { get; set; }
        public List<CajasGeneros> CajasGeneros { get; set; }
    }
}
