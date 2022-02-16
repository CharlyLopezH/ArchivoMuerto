import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import MyFormGroupText from "../utils/FormGroupText";
import { actorCreacionDTO } from "./actores.model";
import * as Yup from 'yup';
import FormGroupFecha from "../utils/FormGroupFecha";
import FormGroupImagen from "../utils/FormGroupImagen";
import FormGroupMarkdown from "../utils/FormGroupMarkdown";

export default function FormularioActores(props: iFormularioActoresProps) {
  return (
    <Formik initialValues={props.modelo} 
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                nombre:Yup.string().required('El nombre es requerido').primeraLetraMayuscula(),
                fechaNacimiento: Yup.date().nullable().required('La fecha es un campo obligatorio')
            })}>            
        {(formikprops)=>(
        <Form>
           <MyFormGroupText campo={"nombre"} label="Nombre: "/>
           <FormGroupFecha label="Fecha de Nacimiento:" campo="fechaNacimiento" />
           <FormGroupImagen label="Foto:" campo="foto" imagenURL={props.modelo.fotoURL}  />
           <FormGroupMarkdown campo={"biografia"} label="Biografía"/>
           <Button disabled={formikprops.isSubmitting} type="submit">Salvar</Button> 
           <Link className="btn btn-secondary" to="/actores"  >Cancelar</Link>   
        </Form>
        )}
    </Formik>
  );
}
interface iFormularioActoresProps {
  modelo: actorCreacionDTO;
  onSubmit(
    valores: actorCreacionDTO,
    acciones: FormikHelpers<actorCreacionDTO>
  ): void;
}
