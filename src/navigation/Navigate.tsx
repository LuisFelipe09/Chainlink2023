import Inicio from '../screens/Inicio';
import Login from '../screens/Login.js';
import Register from '../screens/Registro';
import * as React from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Menu from './menu';

export default function Navigate() {
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };

  return (
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Menu />}>
          <Route index element={<Inicio />} />
          <Route path="Home" element={<Inicio />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="*" element={<Inicio />} />
        </Route>
      </Routes>
  );
}