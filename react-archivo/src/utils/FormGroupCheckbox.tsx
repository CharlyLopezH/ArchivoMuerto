import { Field } from "formik";

export default function FormGroupCheckbox(props: iFormGroupCheckboxProps){

    return(
        <div className="form-group form-check">
            <Field className="form-check-input"
            id={props.label} name={props.campo}
            type="checkbox"
             />
             <label htmlFor={props.campo}>{props.label} 

             </label>
        </div>
    )

}

interface iFormGroupCheckboxProps {

    label:string;
    campo:string;

}