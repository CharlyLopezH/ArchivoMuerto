//import { clear } from "console";
//import React, { useEffect, useState } from "react";
import "./App.css";
import Menu from "./utils/Menu";
//import CajaIndividual from "./cajas/CajaIndividual";
import { Route, Switch } from "react-router";
//import IndiceGeneros from "./generos/IndiceGeneros";
import { BrowserRouter } from "react-router-dom";
//import LandingPage from "./LandingPage";
import rutas from "./route-config";
import configurarValidaciones from "./utils/Validaciones";
import AutenticacionContext from "./auth/AutenticacionContext";
import React, { useEffect, useState } from "react";
import { claim } from "./auth/auth.model";
import { obtenerClaims } from "./auth/manejadorJWT";
import { configurarInterceptor } from "./utils/interceptores";


configurarValidaciones();
configurarInterceptor();

function App() {

  const [claims, setClaims] = useState<claim[]>([]);

useEffect(()=>{
  setClaims(obtenerClaims());
},[])

  function actualizar(claims: claim[]) {
    setClaims(claims);
  }

  function esAdmin() {
    return claims.findIndex(claim => claim.nombre === 'role' && claim.valor === 'admin') > -1;
  }

  return (
    <>    
      <BrowserRouter>
        <AutenticacionContext.Provider value={{ claims, actualizar }}>
          <Menu />
          <div className="container">
            <Switch>
              {rutas.map((ruta) => (
                <Route key={ruta.path} path={ruta.path}
                  exact={ruta.exact}>
                  {ruta.esAdmin && !esAdmin() ? <>
                    No Tiene Autorización para acceder a este componente
                  </> : <ruta.componente />}

                </Route>
              ))}
            </Switch>
          </div>
        </AutenticacionContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
