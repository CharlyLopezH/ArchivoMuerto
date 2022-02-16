//Utilización del formulario Generico para realizar la edición.
//NOTA: se está simulando la entrada de un género pues se supone que esa información viene de una BD.
import EditarEntidad from "../utils/EditarEntidad";
import { urlGeneros } from "../utils/endpoints";
import FormularioGeneros from "./FormularioGeneros";
import { generoCreacionDTO, generoDTO } from "./generos.model";

export default function EditarGenero() {
  return (
    <>
    <EditarEntidad<generoCreacionDTO, generoDTO>
      url={urlGeneros} urlIndice="/generos" nombreEntidad="generos"
      >
      {
        (entidad,editar)=> <FormularioGeneros modelo={entidad}
        onSubmit={async (valores) => {
          await editar(valores);
        }}
      />}
    </EditarEntidad>
    </>
  )
}
