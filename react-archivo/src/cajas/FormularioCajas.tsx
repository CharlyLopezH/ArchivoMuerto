import { Form, Formik, FormikHelpers } from "formik";
import { cajaCreacionDTO } from "./cajas.model";
import * as Yup from 'yup';
import MyFormGroupText from "../utils/FormGroupText";
import FormGroupCheckbox from "../utils/FormGroupCheckbox";
import FormGroupFecha from "../utils/FormGroupFecha";
import FormGroupImagen from "../utils/FormGroupImagen";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import SelectorMultiple, { selectorMultipleModel } from "../utils/SelectorMultiple";
import { generoDTO } from "../generos/generos.model";
import { useState } from "react";
import { cineDTO } from "../cines/cines.model";
import TypeAheadActores from "../actores/TypeAheadActores";
import { actorCajaDTO } from "../actores/actores.model";
import FormGroupMarkdown from "../utils/FormGroupMarkdown";

export default function (props: iFormularioCajasProps) {
    const [generosSeleccionados, setGenerosSeleccionados] = useState(mapear(props.generosSeleccionados));
    const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState(mapear(props.generosNoSeleccionados));

    const[cinesSeleccionados, setCinesSeleccionados] = useState(mapear(props.cinesSeleccionados));
    const[cinesNoSeleccionados, setCinesNoSeleccionados] = useState(mapear(props.cinesNoSeleccionados));

    const [actoresSeleccionados, setActoresSeleccionados] = useState<actorCajaDTO[]>(props.actoresSeleccionados);


    
    function mapear(arreglo: {id:number, nombre:string}[]):selectorMultipleModel[]{
        return arreglo.map(valor=>{
            return {llave:valor.id, valor:valor.nombre}
        }) 
    }

    return (
      <Formik
        initialValues={props.modelo}
        onSubmit={(valores, acciones) => {
          valores.generosIds = generosSeleccionados.map(valor => valor.llave);
          valores.cinesIds = cinesSeleccionados.map(valor=> valor.llave); 
          valores.actores = actoresSeleccionados;
          props.onSubmit(valores, acciones);
        }}
        validationSchema={Yup.object({
          titulo: Yup.string()
            .required("Campo requerido")
            .primeraLetraMayuscula(),
        })}
      >
        {(formikProps) => (
          <Form>
            <MyFormGroupText label="Tíitulo" campo="titulo" />
            <FormGroupCheckbox label="en Cines" campo="enCines" />
            <MyFormGroupText label="Trailer" campo="trailer" />
            <FormGroupFecha
              campo="fechaLanzamiento"
              label="Fecha Lanzamiento"
            />
            <FormGroupImagen
              campo="poster"
              label="Poster"
              imagenURL={props.modelo.posterURL}
            />

            <FormGroupMarkdown campo="resumen" label="Resumen" />

            <div className="form-group">
              <label>Géneros</label>
              <SelectorMultiple
                seleccionados={generosSeleccionados}
                noSeleccionados={generosNoSeleccionados}
                onChange={(seleccionados, noSeleccionados) => {
                  setGenerosSeleccionados(seleccionados);
                  setGenerosNoSeleccionados(noSeleccionados);
                }}
              />
            </div>

            <div className="form-group"> 
                    <label>Cines:</label>
                    <SelectorMultiple 
                    seleccionados={cinesSeleccionados}
                    noSeleccionados={cinesNoSeleccionados}
                    onChange={(seleccionados, noSeleccionados)=> {
                        setCinesSeleccionados(seleccionados)
                        setCinesNoSeleccionados(noSeleccionados);
                    }}
                    />
                </div>

                <div className="form-group">
                    <TypeAheadActores 
                    onAdd={actores=>{
                      setActoresSeleccionados(actores);
                    }}
                    onRemove={actor=> {
                     const actores = actoresSeleccionados.filter(x=>x!==actor);
                     setActoresSeleccionados(actores);
                    }
                    }
                    actores={actoresSeleccionados}
                    listadoUI={(actor: actorCajaDTO)=>
                    <>
                    {actor.nombre} / <input placeholder = "Personaje" 
                                      type= "text" value={actor.personaje}
                                      onChange={e=> {
                                        const indice = actoresSeleccionados.
                                        findIndex(x=>x.id===actor.id);
                                        const actores=[...actoresSeleccionados];
                                        actores[indice].personaje = e.currentTarget.value;
                                        setActoresSeleccionados(actores);
                                      }}
                                      />
                    </>
                  }
                    />
                </div>




            <Button disabled={formikProps.isSubmitting} type="submit">
              Enviar
            </Button>
            <Link className="btn btn-secondary" to="/">
              Cancelar
            </Link>
          </Form>
        )}
      </Formik>
    );

}

interface iFormularioCajasProps {
modelo : cajaCreacionDTO;
onSubmit(valores: cajaCreacionDTO, acciones: FormikHelpers<cajaCreacionDTO>):void;
generosSeleccionados:generoDTO[];
generosNoSeleccionados:generoDTO[];
cinesSeleccionados:cineDTO[];
cinesNoSeleccionados:cineDTO[];
actoresSeleccionados:actorCajaDTO[];
}