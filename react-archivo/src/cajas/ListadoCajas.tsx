import React from "react";
import CajaIndividual from "./CajaIndividual";
import { cajaDTO } from "./cajas.model";
import css from "./ListadoCajas.module.css";
import Cargando from "../utils/Cargando";
import ListadoGenerico from "../utils/ListadoGenerico";
export default function ListadoCajas(props: iListadoCajas) {
  //   if (!props.cajas) {
  //     return <Cargando/>;
  //   } else if (props.cajas.length === 0) {
  //     return <> No hay películas </>;
  //   } else {
  return (
    <ListadoGenerico listado={props.cajas}>
      <div className={css.div}>
        {props.cajas?.map((cajaParam) => 
          <CajaIndividual caja={cajaParam} key={cajaParam.id} 
      />)}
      </div>
    </ListadoGenerico>
        )
}
interface iListadoCajas {
  cajas?: cajaDTO[];
}
