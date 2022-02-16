import Swal from "sweetalert2";
import { resourceLimits } from "worker_threads";

export default function confirmar(onConfirm: any, 
    titulo: string = '¿Deseas borrar el registro?', 
    textoBotonConfirmacion: string="Borrar"
    ){
    Swal.fire({
        title: titulo,
        confirmButtonText: textoBotonConfirmacion,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6'         
    }).then(result=> {
        if(result.isConfirmed) {
            onConfirm();
        }
    })     
    }