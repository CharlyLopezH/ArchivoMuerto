import { actorCreacionDTO } from "../actores/actores.model";
import { cajaCreacionDTO } from "../cajas/cajas.model";

export function convertirActorAFormData(actor: actorCreacionDTO): FormData {
    const formData = new FormData();
    formData.append('nombre', actor.nombre);
    if (actor.biografia) {
        formData.append('biografia', actor.biografia);        
    }
    if (actor.fechaNacimiento) {
        formData.append('fechaNacimiento', formatearFecha(actor.fechaNacimiento) )
    }

    if (actor.foto) {
        formData.append("foto", actor.foto) 
    }



    return formData; 
}

function formatearFecha(date: Date) {
    date=new Date(date);
    const formato = new Intl.DateTimeFormat("en", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const [
        {value: month},,
        {value: day},,
        {value: year}
    ] = formato.formatToParts(date);
    return `${year}-${month}-${day}`;
}

export function convertirCajaAFormData(caja: cajaCreacionDTO): FormData  {
const formData = new FormData();
formData.append('titulo',caja.titulo);
if (caja.resumen) {
    formData.append('resumen', caja.resumen);
}
formData.append('trailer', caja.trailer);
formData.append('enCines', String(caja.enCines));

if (caja.fechaLanzamiento){
    formData.append("fechaLanzamiento", formatearFecha(caja.fechaLanzamiento));
}

if (caja.poster){
    formData.append('poster', caja.poster);
}

formData.append("generosIds", JSON.stringify(caja.generosIds));
formData.append("cinesIds", JSON.stringify(caja.cinesIds));
formData.append("actores", JSON.stringify(caja.actores));


return formData;
}