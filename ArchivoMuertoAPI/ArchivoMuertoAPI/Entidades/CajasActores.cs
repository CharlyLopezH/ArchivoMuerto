using System.ComponentModel.DataAnnotations;

namespace ArchivoMuertoAPI.Entidades
{
    public class CajasActores
    {
        public int CajaId { get; set; }
        public int ActorId { get; set; }
        public Caja Caja { get; set; }
        public Actor Actor { get; set; }
        [StringLength(maximumLength: 100)]
        public string Personaje { get; set; }
        public int Orden { get; set; }
    }
}
