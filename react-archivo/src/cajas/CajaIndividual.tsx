import { cajaDTO } from "./cajas.model";
import css from './CajaIndividual.module.css';
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import confirmar from "../utils/Confirmar";
import axios from "axios";
import { urlCajas } from "../utils/endpoints";
import { useContext } from "react";
import AlertaContext from "../utils/AlertaContext";
import Autorizado from "../auth/Autorizado";

export default function CajaIndividual(props: iCajaIndividual) {
  const enlaceLink = () => `/caja/${props.caja.id}`
  const alerta =useContext(AlertaContext)

  function borrarCaja(){
    axios.delete(`${urlCajas}/${props.caja.id}`)
        .then(() => {
            alerta();
        })
}

  return (
    <div className={css.div}>
      <Link to={enlaceLink()}>
        <img src={props.caja.poster} alt={"Poster"} />
      </Link>
      <p>
        <Link to={enlaceLink()}>  {props.caja.titulo}
        </Link>
      </p>
      <Autorizado role="admin"
      autorizado = {
        <div>
        <Link style={{ marginRight: '1rem' }} className="btn btn-info"
          to={`/cajas/editar/${props.caja.id}`}>Editar</Link>
        <Button
          onClick={() => confirmar(() => borrarCaja())}
          className="btn btn-danger">Borrar</Button>
      </div>


      }
      
      />

    </div>
  );
}

interface iCajaIndividual {
  caja: cajaDTO;
}
