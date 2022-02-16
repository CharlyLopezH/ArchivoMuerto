import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import ListadoCajas from "./cajas/ListadoCajas";
import { landingPageDTO } from "./cajas/cajas.model";
import { urlCajas } from "./utils/endpoints";
import AlertaContext from "./utils/AlertaContext";
import Autorizado from "./auth/Autorizado";
import { getRoles } from "@testing-library/react";

export default function LandingPage() {
  const [cajas, setCajas] = useState<landingPageDTO>({})

  useEffect(() => {
    cargarDatos();
}, [])

function cargarDatos() {
    axios.get(urlCajas)
        .then((respuesta: AxiosResponse<landingPageDTO>) => {
            setCajas(respuesta.data);
        })
}

    return (
    <>
    {/* <Autorizado
    autorizado={<> Estás autorizado </>}
    noAutorizado={<>No autorizado</>}
    role="admin"    
    /> */}

    <AlertaContext.Provider value={()=> cargarDatos()}>
      <h3>Archivo Muerto</h3>
      <ListadoCajas cajas={cajas.enCines} />
      <p></p>
      <h3>Proximos Estrenos</h3>
      <ListadoCajas cajas={cajas.proximosEstrenos} />
      </AlertaContext.Provider>
    </>
  );
}
