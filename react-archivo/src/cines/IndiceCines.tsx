import { Link } from "react-router-dom";
import { urlCines } from "../utils/endpoints";
import IndiceEntidad from "../utils/IndiceEntidad";
import { cineDTO } from "./cines.model";

export default function IndiceCines() {
  return (
    <>
    <IndiceEntidad<cineDTO> url={urlCines} urlCrear="cines/Crear" titulo="Cines" nombreEntidad="Cine" >

{(cines,botones)=><>

  <thead>
        <tr>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {cines?.map((cine) => (
          <tr key={cine.id}>
            <td>
               {botones(`cines/editar/${cine.id}`, cine.id)}
            </td>
            <td>{cine.nombre}</td>
          </tr>
        ))}
      </tbody>
</>
}
</IndiceEntidad>       
     
    </>
  );
}
