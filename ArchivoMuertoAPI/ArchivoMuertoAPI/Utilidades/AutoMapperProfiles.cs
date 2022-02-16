using AutoMapper;
using Microsoft.AspNetCore.Identity;
using NetTopologySuite.Geometries;
using ArchivoMuertoAPI.DTOs;
using ArchivoMuertoAPI.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArchivoMuertoAPI.Utilidades
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles(GeometryFactory geometryFactory)
        {
            CreateMap<Genero, GeneroDTO>().ReverseMap();
            CreateMap<GeneroCreacionDTO, Genero>();
            CreateMap<Actor, ActorDTO>().ReverseMap();
            CreateMap<ActorCreacionDTO, Actor>()
                .ForMember(x => x.Foto, options => options.Ignore());

            CreateMap<CineCreacionDTO, Cine>()
                .ForMember(x => x.Ubicacion, x => x.MapFrom(dto =>
                geometryFactory.CreatePoint(new Coordinate(dto.Longitud, dto.Latitud))));

            CreateMap<Cine, CineDTO>()
                .ForMember(x => x.Latitud, dto => dto.MapFrom(campo => campo.Ubicacion.Y))
                .ForMember(x => x.Longitud, dto => dto.MapFrom(campo => campo.Ubicacion.X));

            CreateMap<CajaCreacionDTO, Caja>()
                .ForMember(x => x.Poster, opciones => opciones.Ignore())
                .ForMember(x => x.CajasGeneros, opciones => opciones.MapFrom(MapearCajasGeneros))
                .ForMember(x => x.CajasCines, opciones => opciones.MapFrom(MapearCajasCines))
                .ForMember(x => x.CajasActores, opciones => opciones.MapFrom(MapearCajasActores));

            CreateMap<Caja, CajaDTO>()
               .ForMember(x => x.Generos, options => options.MapFrom(MapearCajasGeneros))
               .ForMember(x => x.Actores, options => options.MapFrom(MapearCajasActores))
               .ForMember(x => x.Cines, options => options.MapFrom(MapearCajasCines));

            CreateMap<IdentityUser, UsuarioDTO>();

        }

        private List<CineDTO> MapearCajasCines(Caja Caja, CajaDTO CajaDTO)
        {
            var resultado = new List<CineDTO>();

            if (Caja.CajasCines != null)
            {
                foreach (var CajasCines in Caja.CajasCines)
                {
                    resultado.Add(new CineDTO()
                    {
                        Id = CajasCines.CineId,
                        Nombre = CajasCines.Cine.Nombre,
                        Latitud = CajasCines.Cine.Ubicacion.Y,
                        Longitud = CajasCines.Cine.Ubicacion.X
                    });
                }
            }

            return resultado;
        }

        private List<CajaActorDTO> MapearCajasActores(Caja Caja, CajaDTO CajaDTO)
        {
            var resultado = new List<CajaActorDTO>();

            if (Caja.CajasActores != null)
            {
                foreach (var actorCajas in Caja.CajasActores)
                {
                    resultado.Add(new CajaActorDTO()
                    {
                        Id = actorCajas.ActorId,
                        Nombre = actorCajas.Actor.Nombre,
                        Foto = actorCajas.Actor.Foto,
                        Orden = actorCajas.Orden,
                        Personaje = actorCajas.Personaje
                    });
                }
            }
            return resultado;
        }

        private List<GeneroDTO> MapearCajasGeneros(Caja Caja, CajaDTO CajaDTO)
        {
            var resultado = new List<GeneroDTO>();

            if (Caja.CajasGeneros != null)
            {
                foreach (var genero in Caja.CajasGeneros)
                {
                    resultado.Add(new GeneroDTO() { Id = genero.GeneroId, Nombre = genero.Genero.Nombre });
                }
            }

            return resultado;
        }

        private List<CajasActores> MapearCajasActores(CajaCreacionDTO CajaCreacionDTO,
           Caja Caja)
        {
            var resultado = new List<CajasActores>();

            if (CajaCreacionDTO.Actores == null) { return resultado; }

            foreach (var actor in CajaCreacionDTO.Actores)
            {
                resultado.Add(new CajasActores() { ActorId = actor.Id, Personaje = actor.Personaje });
            }

            return resultado;
        }

        private List<CajasGeneros> MapearCajasGeneros(CajaCreacionDTO CajaCreacionDTO,
            Caja Caja)
        {
            var resultado = new List<CajasGeneros>();

            if (CajaCreacionDTO.GenerosIds == null) { return resultado; }

            foreach (var id in CajaCreacionDTO.GenerosIds)
            {
                resultado.Add(new CajasGeneros() { GeneroId = id });
            }

            return resultado;
        }

        private List<CajasCines> MapearCajasCines(CajaCreacionDTO CajaCreacionDTO,
           Caja Caja)
        {
            var resultado = new List<CajasCines>();

            if (CajaCreacionDTO.CinesIds == null) { return resultado; }

            foreach (var id in CajaCreacionDTO.CinesIds)
            {
                resultado.Add(new CajasCines() { CineId = id });
            }

            return resultado;
        }
    }
}