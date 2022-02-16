import { Formik, Form, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import MyFormGroupText from "../utils/FormGroupText";
import * as Yup from 'yup';
import { generoCreacionDTO } from "./generos.model";

//Reutilización de Formulario de Captura (Creación y edición es prácticamente lo mismo)
export default function FormularioGeneros(props: iModelFormularioGeneroDTO) {
return (
    <Formik
    initialValues={props.modelo}
    onSubmit={props.onSubmit}
    validationSchema={Yup.object({
      nombre: Yup.string()
        .required("Este campo es obligatorio")
        //.max(25,'La longitud máxima es de 25 caracteres')
        // .primeraLetraMayuscula(),
    })}
  >
    {(formikProps) => (
      <Form>
        <MyFormGroupText campo="nombre"  label="Nombre" placeHolder="Introducir Género..."/>
        <Button disabled={formikProps.isSubmitting} type="submit">Salvar</Button>
        <Link className="btn btn-secondary" to="/generos">
          Cancelar
        </Link>
      </Form>
    )}
  </Formik>

)    
}

interface iModelFormularioGeneroDTO {
    modelo: generoCreacionDTO;
    onSubmit(valores: generoCreacionDTO, accion:FormikHelpers<generoCreacionDTO>):void;
}