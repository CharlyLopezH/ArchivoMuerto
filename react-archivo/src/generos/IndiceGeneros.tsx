import { urlCines, urlGeneros } from "../utils/endpoints";
import IndiceEntidad from "../utils/IndiceEntidad";
import { generoDTO } from "./generos.model";

export default function IndiceGeneros() {

  return (
    <>
    <IndiceEntidad<generoDTO> url={urlGeneros} urlCrear="generos/Crear" titulo="Generos" nombreEntidad="Generos" >

    {(generos,botones)=><>
    
      <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {generos?.map((genero) => (
              <tr key={genero.id}>
                <td>
                   {botones(`generos/editar/${genero.id}`, genero.id)}
                </td>
                <td>{genero.nombre}</td>
              </tr>
            ))}
          </tbody>
    </>
    }
    </IndiceEntidad>       
    </>
  );
}
