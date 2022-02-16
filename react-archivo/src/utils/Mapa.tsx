import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from 'react-leaflet';
import L, { popup } from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { coordenadaDTO } from './coordenadas.model';
import { useState } from 'react';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [16, 37],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Mapa(props: mapaProps) {
    const [coordenadas, setCoordenadas] = useState<coordenadaDTO[]>(props.coordenadas)
    return (
        <MapContainer center={[20.634945159114743, -103.41040257092139]} zoom={14} style={{ height: props.height }} >
            <TileLayer attribution="React Cajas"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                

            {props.soloLectura ? null : <ClickMapa setPunto={coordenadas => {
                setCoordenadas([coordenadas]);
                props.manejarClickMapa(coordenadas);
            }} />}


            {coordenadas.map(coordenada => <Marcador key={coordenada.lat + coordenada.lng} {...coordenada} />)}
        </MapContainer>
    )
}
function ClickMapa(props: iClickMapaProps) {
    useMapEvent('click', e => {
        props.setPunto({ lat: e.latlng.lat, lng: e.latlng.lng })
    })
    return null;
}

interface iClickMapaProps {
    setPunto(coordenadas: coordenadaDTO): void;

}

interface mapaProps {
    height: string;
    coordenadas: coordenadaDTO[];
    manejarClickMapa(coordenadas: coordenadaDTO): void;
    soloLectura: boolean;
}

function Marcador(props: coordenadaDTO) {
    return (
        <Marker position={[props.lat, props.lng]}>
            {props.nombre ? <Popup>{props.nombre}</Popup> : null} 
        </Marker>
    )
}

Mapa.defaultProps = {
    height: '500px',
    soloLectura: false,
    manejarClickMapa: () => { }
}