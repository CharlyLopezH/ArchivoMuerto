using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArchivoMuertoAPI.DTOs;
using ArchivoMuertoAPI.Entidades;
using ArchivoMuertoAPI.Utilidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArchivoMuertoAPI.Controllers
{
    [ApiController]
    [Route("api/Cajas")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "EsAdmin") ]
    public class CajasController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IAlmacenadorArchivos almacenadorArchivos;
        private readonly string contenedor = "Cajas";

        public UserManager<IdentityUser> UserManager { get; }

        public CajasController(ApplicationDbContext context, IMapper mapper,
            IAlmacenadorArchivos almacenadorArchivos, 
            UserManager<IdentityUser> userManager)
        {
            this.context = context;
            this.mapper = mapper;
            this.almacenadorArchivos = almacenadorArchivos;
            UserManager = userManager;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<LandingPageDTO>> Get()
        {
            var top = 6;
            var hoy = DateTime.Today;

            var proximosEstrenos = await context.Cajas
                .Where(x => x.FechaLanzamiento > hoy)
                .OrderBy(x => x.FechaLanzamiento)
                .Take(top)
                .ToListAsync();

            var enCines = await context.Cajas
                .Where(x => x.EnCines)
                .OrderBy(x => x.FechaLanzamiento)
                .Take(top)
                .ToListAsync();

            var resultado = new LandingPageDTO();
            resultado.ProximosEstrenos = mapper.Map<List<CajaDTO>>(proximosEstrenos);
            resultado.EnCines = mapper.Map<List<CajaDTO>>(enCines);

            return resultado;
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<CajaDTO>> Get(int id)
        {
            var Caja = await context.Cajas
                .Include(x => x.CajasGeneros).ThenInclude(x => x.Genero)
                .Include(x => x.CajasActores).ThenInclude(x => x.Actor)
                .Include(x => x.CajasCines).ThenInclude(x => x.Cine)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (Caja == null) { return NotFound(); }

            var promedioVoto = 0.0;
            var votoUsuario = 0;

            if (await context.Ratings.AnyAsync(x=>x.CajaId == id)) 
            {
                promedioVoto = await context.Ratings.Where(x => x.CajaId == id).AverageAsync(x => x.Puntuacion);

                if (HttpContext.User.Identity.IsAuthenticated) 
                { 
                    var email = HttpContext.User.Claims.FirstOrDefault(x=> x.Type == "email").Value;
                    var usuario = await UserManager.FindByEmailAsync(email);
                    var usuarioId = usuario.Id;

                    var ratingDB = await context.Ratings
                    .FirstOrDefaultAsync(x => x.UsuarioId == usuarioId && x.CajaId == id);

                    if (ratingDB != null)
                    {
                        votoUsuario = ratingDB.Puntuacion;
                    }

                }
            }

            var dto = mapper.Map<CajaDTO>(Caja);
            dto.PromedioVoto = promedioVoto;
            dto.VotoUsuario = votoUsuario;
            dto.Actores = dto.Actores.OrderBy(x => x.Orden).ToList();
            return dto;
        }

        [HttpGet("filtrar")]
        [AllowAnonymous]
        public async Task<ActionResult<List<CajaDTO>>> Filtrar([FromQuery] CajasFiltrarDTO CajasFiltrarDTO)
        {
            var CajasQueryable = context.Cajas.AsQueryable();

            if (!string.IsNullOrEmpty(CajasFiltrarDTO.Titulo))
            {
                CajasQueryable = CajasQueryable.Where(x => x.Titulo.Contains(CajasFiltrarDTO.Titulo));
            }

            if (CajasFiltrarDTO.EnCines)
            {
                CajasQueryable = CajasQueryable.Where(x => x.EnCines);
            }

            if (CajasFiltrarDTO.ProximosEstrenos)
            {
                var hoy = DateTime.Today;
                CajasQueryable = CajasQueryable.Where(x => x.FechaLanzamiento > hoy);
            }

            if (CajasFiltrarDTO.GeneroId != 0)
            {
                CajasQueryable = CajasQueryable
                    .Where(x => x.CajasGeneros.Select(y => y.GeneroId)
                    .Contains(CajasFiltrarDTO.GeneroId));
            }

            await HttpContext.InsertarParametrosPaginacionEnCabecera(CajasQueryable);

            var Cajas = await CajasQueryable.Paginar(CajasFiltrarDTO.PaginacionDTO).ToListAsync();
            return mapper.Map<List<CajaDTO>>(Cajas);
        }


        [HttpGet("PostGet")]
        public async Task<ActionResult<CajasPostGetDTO>> PostGet()
        {
            var cines = await context.Cines.ToListAsync();
            var generos = await context.Generos.ToListAsync();

            var cinesDTO = mapper.Map<List<CineDTO>>(cines);
            var generosDTO = mapper.Map<List<GeneroDTO>>(generos);

            return new CajasPostGetDTO() { Cines = cinesDTO, Generos = generosDTO };
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] CajaCreacionDTO CajaCreacionDTO)
        {
            var Caja = mapper.Map<Caja>(CajaCreacionDTO);

            if (CajaCreacionDTO.Poster != null)
            {
                Caja.Poster = await almacenadorArchivos.GuardarArchivo(contenedor, CajaCreacionDTO.Poster);
            }

            EscribirOrdenActores(Caja);

            context.Add(Caja);
            await context.SaveChangesAsync();
            return Caja.Id;
            //return NoContent();
        }

        private void EscribirOrdenActores(Caja Caja)
        {
            if (Caja.CajasActores != null)
            {
                for (int i = 0; i < Caja.CajasActores.Count; i++)
                {
                    Caja.CajasActores[i].Orden = i;
                }
            }
        }

        [HttpGet("PutGet/{id:int}")]
        public async Task<ActionResult<CajasPutGetDTO>> PutGet(int id)
        {
            var CajaActionResult = await Get(id);
            if (CajaActionResult.Result is NotFoundResult) { return NotFound(); }

            var Caja = CajaActionResult.Value;

            var generosSeleccionadosIds = Caja.Generos.Select(x => x.Id).ToList();
            var generosNoSeleccionados = await context.Generos
                .Where(x => !generosSeleccionadosIds.Contains(x.Id))
                .ToListAsync();

            var cinesSeleccionadosIds = Caja.Cines.Select(x => x.Id).ToList();
            var cinesNoSeleccionados = await context.Cines
                .Where(x => !cinesSeleccionadosIds.Contains(x.Id))
                .ToListAsync();

            var generosNoSeleccionadosDTO = mapper.Map<List<GeneroDTO>>(generosNoSeleccionados);
            var cinesNoSeleccionadosDTO = mapper.Map<List<CineDTO>>(cinesNoSeleccionados);

            var respuesta = new CajasPutGetDTO();
            respuesta.Caja = Caja;
            respuesta.GenerosSeleccionados = Caja.Generos;
            respuesta.GenerosNoSeleccionados = generosNoSeleccionadosDTO;
            respuesta.CinesSeleccionados = Caja.Cines;
            respuesta.CinesNoSeleccionados = cinesNoSeleccionadosDTO;
            respuesta.Actores = Caja.Actores;
            return respuesta;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] CajaCreacionDTO CajaCreacionDTO)
        {
            var Caja = await context.Cajas
                .Include(x => x.CajasActores)
                .Include(x => x.CajasGeneros)
                .Include(x => x.CajasCines)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (Caja == null)
            {
                return NotFound();
            }

            Caja = mapper.Map(CajaCreacionDTO, Caja);

            if (CajaCreacionDTO.Poster != null)
            {
                Caja.Poster = await almacenadorArchivos.EditarArchivo(contenedor, CajaCreacionDTO.Poster, Caja.Poster);
            }

            EscribirOrdenActores(Caja);

            await context.SaveChangesAsync();
            return NoContent();
        }



        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var Caja = await context.Cajas.FirstOrDefaultAsync(x => x.Id == id);

            if (Caja == null)
            {
                return NotFound();
            }

            context.Remove(Caja);
            await context.SaveChangesAsync();
            await almacenadorArchivos.BorrarArchivo(Caja.Poster, contenedor);
            return NoContent();
        }
    }
}