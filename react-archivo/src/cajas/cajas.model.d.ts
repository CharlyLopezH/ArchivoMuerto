import { actorCajaDTO } from "../actores/actores.model";
import { generoDTO } from "../generos/generos.model";

export interface cajaDTO {
    id:number,
    titulo:string,
    poster:string
    enCines: boolean;
    trailer: string;
    resumen?: string;
    fechaLanzamiento: Date;
    cines:cineDTO[];
    generos:generoDTO[];
    actores:actorCajaDTO[];
    votoUsuario?: number;
    promedioVoto?:number;
}

export interface cajaCreacionDTO {
    titulo: string;
    enCines: boolean;
    trailer: string;
    resumen?: string;
    fechaLanzamiento?: Date;
    poster?: File;
    posterURL?: string; 
    generosIds?:number[];
    cinesIds?: number[];
    actores?:actorCajaDTO[];
}

export interface landingPageDTO {
    enCines?: cajaDTO[];
    proximosEstrenos?: cajaDTO[]
}

export interface cajasPostGetDTO {
    generos: generoDTO[];
    cines:cineDTO[]
}

export interface cajasPutGetDTO {
    caja: cajaDTO;
    generosSeleccionados: generoDTO[];
    generosNoSeleccionados: generoDTO[];
    cinesSeleccionados: cineDTO[];
    cinesNoSeleccionados: cineDTO[];
    actores: actorCajaDTO[];
}