import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AutenticacionContext from "../auth/AutenticacionContext";
import Autorizado from "../auth/Autorizado";
import { logout } from "../auth/manejadorJWT";
import Button from "./Button";

export default function Menu() {
    const claseActiva = "active";
    const { actualizar, claims } = useContext(AutenticacionContext);

    function obtenerNombreUsuario(): string {
        return claims.filter(x => x.nombre === "email")[0]?.valor;
    }
    function obtenerRol(): string {
        return claims.filter(x => x.nombre === "role")[0]?.valor;
    }
    

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand"
                    activeClassName={claseActiva}
                    to="/">React Cajas</NavLink>
                <div className="collapse navbar-collapse" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName={claseActiva}
                                to="/cajas/filtrar">
                                Filtrar Cajas
                            </NavLink>
                        </li>
                        <Autorizado role="admin"
                            autorizado={
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName={claseActiva}
                                            to="/generos">
                                            Géneros
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName={claseActiva}
                                            to="/actores">
                                            Actores
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName={claseActiva}
                                            to="/cines">
                                            Cines
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName={claseActiva}
                                            to="/cajas/crear">
                                            Crear Cajas
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName={claseActiva}
                                            to="/usuarios">
                                            Usuarios
                                        </NavLink>
                                    </li>
                                </>
                            }
                        />


                    </ul>

                    {/* <div className="d-flex"> Prueba                                        
                         <Button 
                            onClick={() => {
                                logout();
                                actualizar([]);
                            }}
                            className="nav-link btn btn-link">Salir</Button>                                        
                    </div> */}

                    <div className="d-flex" >
                        <Autorizado
                            autorizado={<>
                                 <span className="nav-link">Hola, {obtenerNombreUsuario()}</span>
                                {
                                obtenerRol() ?
                                <span className="nav-link">Bienvenido, {obtenerRol()}</span>
                                : 
                                <span className="nav-link"></span>
                                }
                                <Button 
                            onClick={() => {
                                logout();
                                actualizar([]);
                            }}
                            className="nav-link btn btn-link">Log out</Button>
                            </>}
                            noAutorizado={<>
                                <Link to="/Registro" className="nav-link btn btn-link">
                                    Registro
                                </Link>
                                <Link to="/Login" className="nav-link btn btn-link">
                                    Login
                                </Link>
                            </>}
                        />
                    </div>


                </div>
            </div>
        </nav>
    )
}