namespace ArchivoMuertoAPI.Entidades
{
    public class CajasCines
    {
        public int CajaId { get; set; }
        public int CineId { get; set; }
        public Caja Caja { get; set; }
        public Cine Cine { get; set; }
    }
}
