export default function MostrarErrores(props: iMostrarErroresProps){
    const style = {color:'red'} 
    return(
    <>
    {props.errores ? <ul style={style}>
        {props.errores.map((error, indice)=>{
            return <li key={indice}>{error}</li>
        } )}
    </ul> : null}
    </>
    )
}

interface iMostrarErroresProps{
    errores?: string[];
} 