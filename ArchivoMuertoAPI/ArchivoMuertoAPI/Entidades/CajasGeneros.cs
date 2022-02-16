namespace ArchivoMuertoAPI.Entidades
{
    public class CajasGeneros
    {
        public int CajaId { get; set; }
        public int GeneroId { get; set; }
        public Caja Caja { get; set; }
        public Genero Genero { get; set; }
    }
}
