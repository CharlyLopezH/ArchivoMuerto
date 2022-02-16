import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { cineDTO } from "../cines/cines.model";
import { generoDTO } from "../generos/generos.model";
import Cargando from "../utils/Cargando";

import { urlCajas } from "../utils/endpoints";
import { convertirCajaAFormData } from "../utils/FormDataUtils";
import MostrarErrores from "../utils/MostrarErrores";
import FormularioCajas from "./FormularioCajas";
import { cajaCreacionDTO, cajasPostGetDTO } from "./cajas.model";

export default function CrearCajas() {

    const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState<generoDTO[]>([]);
    const [cinesNoSeleccionados, setCinesNoSeleccionados] = useState<generoDTO[]>([]);
    const [cargado,setCargado] = useState(false);
    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);

    useEffect(()=>{
        axios.get(`${urlCajas}/postget`)
        .then((respuesta:AxiosResponse<cajasPostGetDTO>)=>{
            setGenerosNoSeleccionados(respuesta.data.generos);
            setCinesNoSeleccionados(respuesta.data.cines);
            setCargado(true);
        }) 
    },[])

    async function crear(caja: cajaCreacionDTO){
        try {
            const formData = convertirCajaAFormData(caja);
            await axios({
                method: 'post',
                url: urlCajas,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            }).then((respuesta: AxiosResponse<number>) => {
                history.push(`/caja/${respuesta.data}`);
            })
        }
        catch(error) {
            setErrores(error.response.data);
        }
    }

    return(
    <>
    <h3>Crear Película</h3> 
    <MostrarErrores errores={errores} />
    {cargado ?
    <FormularioCajas 
    actoresSeleccionados={[]}
    cinesNoSeleccionados={cinesNoSeleccionados}
    cinesSeleccionados={[]}
    generosNoSeleccionados={generosNoSeleccionados}
    generosSeleccionados = {[]}
    modelo={{titulo:'',enCines: false,trailer:'' }}
    onSubmit={valores=>crear(valores)}
    /> : <Cargando /> }
    </>
    )
}