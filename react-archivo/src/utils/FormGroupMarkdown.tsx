import { Field, useFormikContext } from "formik";
import ReactMarkdown from "react-markdown";
import './FormGroupMarkdown.css';

export default function FormGroupMarkdown(props: iFormGroupMarkdownsProps) {
    const {values} = useFormikContext<any>();
    return(
        <div className="form-group form-markdown">
            <div>
                <label>{props.label}</label>
                <div>
                    <Field name={props.campo} as = "textarea" className="form-textarea" />
                </div>
            </div>
            <div>
                <label>{props.label} (preliminar): </label>
                <div className="markdwon-container"></div>
                <ReactMarkdown>{values[props.campo]}</ReactMarkdown>
            </div>
        </div>
    )
}
interface iFormGroupMarkdownsProps {
    campo:string;
    label:string;
}