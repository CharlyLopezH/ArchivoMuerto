import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Cargando from "../utils/Cargando";
import { urlCajas } from "../utils/endpoints";
import { convertirCajaAFormData } from "../utils/FormDataUtils";
import MostrarErrores from "../utils/MostrarErrores";
import FormularioCajas from "./FormularioCajas";
import { cajaCreacionDTO, cajasPutGetDTO } from "./cajas.model";

export default function EditarCaja() {

    const [caja, setCaja] = useState<cajaCreacionDTO>();
    const [cajaPutGet, setCajaPutGet] = useState<cajasPutGetDTO>();
    const { id }: any = useParams();
    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);

    useEffect(() => {
        axios.get(`${urlCajas}/PutGet/${id}`)
            .then((respuesta: AxiosResponse<cajasPutGetDTO>) => {
                const modelo: cajaCreacionDTO = {
                    titulo: respuesta.data.caja.titulo,
                    enCines: respuesta.data.caja.enCines,
                    trailer: respuesta.data.caja.trailer,
                    posterURL: respuesta.data.caja.poster,
                    resumen: respuesta.data.caja.resumen,
                    fechaLanzamiento: new Date(respuesta.data.caja.fechaLanzamiento)
                };
                setCaja(modelo);
                setCajaPutGet(respuesta.data);
            })
    }, [id])

    async function editar(cajaEditar: cajaCreacionDTO) {
        try{
            const formData = convertirCajaAFormData(cajaEditar);
            await axios({
                method: 'put',
                url: `${urlCajas}/${id}`,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            });
            history.push(`/caja/${id}`);
        }
        catch(error){
            setErrores(error.response.data);
        }
    }

    return(
        <>
            <h3>Editar Película</h3>
            <MostrarErrores errores={errores} />
            {caja && cajaPutGet ? <FormularioCajas
                actoresSeleccionados={cajaPutGet.actores}
                cinesSeleccionados={cajaPutGet.cinesSeleccionados}
                cinesNoSeleccionados={cajaPutGet.cinesNoSeleccionados}
                generosNoSeleccionados={cajaPutGet.generosNoSeleccionados}
                generosSeleccionados={cajaPutGet.generosSeleccionados}
                modelo={caja}
                onSubmit={async valores => await editar(valores)}
            /> : <Cargando />}


        </>
    )
}