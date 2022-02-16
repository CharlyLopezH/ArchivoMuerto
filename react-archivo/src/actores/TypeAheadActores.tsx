import { actorCajaDTO } from "./actores.model";
import { AsyncTypeahead as AsyncTypeahead } from "react-bootstrap-typeahead";
import { ReactElement, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlActores } from "../utils/endpoints";

export default function TypeAheadActores(props: iTypeAheadActoresProps) {
  
  const [opciones, setOpciones] = useState<actorCajaDTO[]>([]);

  const [estaCargando, setEstaCargando] = useState(false);

  const seleccion: actorCajaDTO[]=[];

  const [elementoArrastrado, setElementoArrastrado] = useState<actorCajaDTO | undefined>(undefined)

  function manejarBusqueda(query: string){
    setEstaCargando(true);

    axios.get(`${urlActores}/buscarPorNombre/${query}`)
        .then((respuesta: AxiosResponse<actorCajaDTO[]>) => {
            setOpciones(respuesta.data);
            setEstaCargando(false);
        })
}

  function manejarDragStart(actor: actorCajaDTO) {
    setElementoArrastrado(actor);
  }

  function manejarDragOver(actor: actorCajaDTO) {
    if (!elementoArrastrado) {
      return;
    }
    if(actor.id !== elementoArrastrado.id){
      const elementoArrastradoIndice = 
            props.actores.findIndex(x => x.id === elementoArrastrado.id);
      const actorIndice =
            props.actores.findIndex(x => x.id === actor.id);
      const actores  = [...props.actores];
      actores[actorIndice] = elementoArrastrado;
      actores[elementoArrastradoIndice] = actor;
      props.onAdd(actores);
    }




  }

  return (
    <>
      <label>Actores</label>
      <AsyncTypeahead
        id="typeahead"
        onChange={(actores) => {
          if (props.actores.findIndex((x) => x.id === actores[0].id) === -1) {
            props.onAdd([...props.actores, actores[0]]);
          }
        }}
        options={opciones}
        labelKey={(actor) => actor.nombre}
        filterBy={()=>true}
        isLoading={estaCargando}
        onSearch={manejarBusqueda}
        placeholder="Escriba el nombre para la búsqueda..."
        minLength={2}
        flip={true}
        selected={seleccion}
        renderMenuItemChildren={(actor) => (
          <>
            <img
              alt="Imagen actor"
              src={actor.foto}
              style={{
                height: "64px",
                marginRight: "10px",
                width: "64px",
              }}
            />
            <span>{actor.nombre}</span>
          </>
        )}
      />
      <ul className="list-group">
        {props.actores.map(actor => <li 
        draggable={true}
        onDragStart={()=>manejarDragStart(actor)}
        onDragOver={()=>manejarDragOver(actor)}
        className="list-group-item  list-group-item-secondary"
        key={actor.id}> 
        {props.listadoUI(actor)}
        <span className="badge badge-primary badge-pill"
        // style={{marginLeft: '0.5rem'}} 
        onClick={()=>props.onRemove(actor)}
        >
          X
        </span>
        </li>)}
      </ul>
    </>
  );
}
interface iTypeAheadActoresProps {
  actores: actorCajaDTO[];
  onAdd(actores: actorCajaDTO[]): void;
  listadoUI(actor: actorCajaDTO): ReactElement;
  onRemove(actor: actorCajaDTO):void;
}
