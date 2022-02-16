import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { ValidationError } from "yup";
import Cargando from "../utils/Cargando";
import { coordenadaDTO } from "../utils/coordenadas.model";
import { urlCajas, urlRatings } from "../utils/endpoints";
import Mapa from "../utils/Mapa";
import Rating from "../utils/Rating";
import { cajaDTO } from "./cajas.model";

export default function DetalleCaja() {
    const { id }: any = useParams();
    const [caja, setCaja] = useState<cajaDTO>();

    useEffect(() => {
        axios.get(`${urlCajas}/${id}`)
            .then((respuesta: AxiosResponse<cajaDTO>) => {
                respuesta.data.fechaLanzamiento = new Date(respuesta.data.fechaLanzamiento);
                setCaja(respuesta.data);
            })
    }, [id])

    function transformarCoordenadas(): coordenadaDTO[] {
        if (caja?.cines) {
            const coordenadas = caja.cines.map(cine => {
                return {
                    lat: cine.latitud,
                    lng: cine.longitud, nombre: cine.nombre
                } as coordenadaDTO;
            });
            return coordenadas;
        }

        return [];
    }

    function generarURLYoutubeEmbebido(url: any): string {
        if (!url) {
            return '';
        }

        var video_id = url.split('v=')[1];
        var posicionAmpersand = video_id.indexOf('&');
        if (posicionAmpersand !== -1) {
            video_id = video_id.substring(0, posicionAmpersand);
        }

        return `https://www.youtube.com/embed/${video_id}`
    }

    async function onVote(voto: number) {
        await axios.post(urlRatings, { puntuacion: voto, cajaId: id })
        Swal.fire({ icon: 'success', title: 'Voto recibido' });
    }
    return (
        caja ?
            <div style={{ display: 'flex' }}>
                <div>
                    <h2>{caja.titulo} ({caja.fechaLanzamiento.getFullYear()})</h2>
                    {caja.generos?.map(genero =>
                        <Link key={genero.id} style={{ marginRight: '5px' }}
                            className="btn btn-primary btn-sm rounded-pill"
                            to={`/cajas/filtrar?generoId=${genero.id}`}
                        >{genero.nombre}</Link>)
                    }
                    | {caja.fechaLanzamiento.toDateString()}
                    | Voto promedio: {caja.promedioVoto}
                    | Tu Voto:
                    <Rating maximoValor={5}
                        valorSeleccionado={caja.votoUsuario!}
                        onChange={onVote}
                    />

                    <div style={{ display: 'flex', marginTop: '1rem' }}>
                        <span style={{ display: 'inline-block', marginRight: '1rem' }}>
                            <img src={caja.poster}
                                style={{ width: '225px', height: '315px' }}
                                alt="poster"
                            />
                        </span>
                        {caja.trailer ? <div>
                            <iframe
                                title="youtube-trailer"
                                width="560"
                                height="315"
                                src={generarURLYoutubeEmbebido(caja.trailer)}
                                frameBorder={0}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            >

                            </iframe>
                        </div> : null}
                    </div>

                    {caja.resumen ?
                        <div style={{ marginTop: '1rem' }}>
                            <h3>Resumen</h3>
                            <div>
                                <ReactMarkdown>{caja.resumen}</ReactMarkdown>
                            </div>
                        </div> : null}

                    {caja.actores && caja.actores.length > 0 ?
                        <div style={{ marginTop: '1rem' }}>
                            <h3>Actores</h3>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {caja.actores?.map(actor =>
                                    <div key={actor.id} style={{ marginBottom: '2px' }}>
                                        <img alt="foto" src={actor.foto}
                                            style={{ width: '50px', verticalAlign: 'middle' }} />
                                        <span style={{
                                            display: 'inline-block', width: '200px',
                                            marginLeft: '1rem'
                                        }}>
                                            {actor.nombre}
                                        </span>
                                        <span style={{
                                            display: 'inline-block',
                                            width: '45px'
                                        }}>...</span>
                                        <span>{actor.personaje}</span>
                                    </div>)}
                            </div>
                        </div> : null}

                    {caja.cines && caja.cines.length > 0 ?
                        <div>
                            <h2>Localizado en la siguiente ubicación:</h2>
                            <Mapa soloLectura={true} coordenadas={transformarCoordenadas()} />
                        </div> : null}

                </div>
            </div> : <Cargando />
    )
}