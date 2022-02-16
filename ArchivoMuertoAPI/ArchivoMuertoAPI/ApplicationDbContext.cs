using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ArchivoMuertoAPI.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArchivoMuertoAPI
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CajasActores>()
                   .HasKey(x => new { x.ActorId, x.CajaId });

            modelBuilder.Entity<CajasGeneros>()
                .HasKey(x => new { x.CajaId, x.GeneroId });

            modelBuilder.Entity<CajasCines>()
                .HasKey(x => new { x.CajaId, x.CineId });

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Genero> Generos { get; set; }
        public DbSet<Actor> Actores { get; set; }
        public DbSet<Cine> Cines { get; set; }
        public DbSet<Caja> Cajas { get; set; } //*qué pasa aquí
        public DbSet<CajasActores> CajasActores { get; set; }
        public DbSet<CajasGeneros> CajasGeneros { get; set; }
        public DbSet<CajasCines> CajasCines { get; set; }
        public DbSet<Rating> Ratings { get; set; }
    }
}
