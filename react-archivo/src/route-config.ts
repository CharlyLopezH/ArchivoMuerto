import CrearActores from "./actores/CrearActores";
import EditarActor from "./actores/EditarActores";
import IndiceActores from "./actores/IndiceActores";
import Login from "./auth/Login";
import Registro from "./auth/Registro";
import CrearCine from "./cines/CrearCine";
import EditarCine from "./cines/EditarCine";
import IndiceCines from "./cines/IndiceCines";
import FiltroCajas from "./filtro/FiltroCajas";
import CrearGenero from "./generos/CrearGenero";
import EditarGenero from "./generos/EditarGenero";
import IndiceGeneros from "./generos/IndiceGeneros";
import LandingPage from "./LandingPage";
import CrearCajas from "./cajas/CrearCaja";
import DetalleCaja from "./cajas/DetalleCaja";
import EditarCaja from "./cajas/EditarCaja";
import RedirectToLandingPage from "./utils/RedirectToLandingPage";
import IndiceUsuarios from "./auth/indiceUsuarios";

const rutas = [
    //Hace la verificación de una por una; en la primera coincidencia que encuentra ahí se queda.
    //Con exact: true se hace que se quede en esa únicamente, la usamos para índices.
    //"/:id(\\d+)" se usa para poder leer el string de una url; y va con el Hook de useParam
    {path: '/generos/crear', componente: CrearGenero, esAdmin: true},    
    {path: '/generos/editar/:id(\\d+)', componente: EditarGenero, esAdmin: true},
    {path: '/generos', componente: IndiceGeneros, exact: true, esAdmin: true},        
        
    {path: '/cines/crear', componente: CrearCine, esAdmin: true},
    {path: '/cines/editar/:id(\\d+)', componente: EditarCine, esAdmin: true},
    {path: '/cines', componente: IndiceCines, esAdmin: true},    

    {path: '/actores/crear', componente: CrearActores, esAdmin: true},
    {path: '/actores/editar/:id(\\d+)', componente: EditarActor, esAdmin: true},
    {path: '/actores', componente: IndiceActores, exact:true},    


    {path: '/caja/:id(\\d+)', componente: DetalleCaja},
    {path: '/cajas/crear', componente: CrearCajas, esAdmin: true},
    {path: '/cajas/editar/:id(\\d+)', componente: EditarCaja, esAdmin:true },
    {path: '/cajas/filtrar', componente: FiltroCajas },

    {path: '/registro', componente: Registro}, 
    {path: '/login', componente: Login},

    {path: '/usuarios', componente: IndiceUsuarios, esAdmin:true},
        

    {path:'/', componente: LandingPage, exact: true},
    //Rediecciona a donde le digamos en el componente personalizado RedirectToLandingPage
    {path:'*', componente: RedirectToLandingPage}
];
export default rutas; 