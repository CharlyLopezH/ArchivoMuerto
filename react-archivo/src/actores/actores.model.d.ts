export interface actorDTO {
    id: number;
    nombre: string;
    biografia: string;
    fechaNacimiento: Date;
    foto: string;
}

export interface actorCreacionDTO {
    nombre:string;
    fechaNacimiento?:Date;
    foto?: File;
    biografia?: string;
    fotoURL?: string;    
}

export interface actorCajaDTO{
    id:number;
    nombre:string;
    personaje: string;
    foto:string;
}