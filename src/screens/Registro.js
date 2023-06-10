import { Container, Row } from 'react-bootstrap';
import Registros from '../components/RegistroFormulario';
import React from 'react';
import {
  useNavigate 
} from "react-router-dom";

export default function Registro(){
  let navigate = useNavigate();
  React.useEffect(() =>{
      if(sessionStorage.getItem("phone") != null){
          navigate("/");
      }
  })
    return (
      <Container fluid>
        <Row className="justify-content-md-center back register">
            <Registros></Registros>
        </Row>
    </Container>
      );
}