import { Container, Row } from 'react-bootstrap';
import LoginFormulario from '../components/LoginFormulario'
import React from 'react';
import {
    useNavigate 
  } from "react-router-dom";
export default function Login(){
    let navigate = useNavigate();
    React.useEffect(() =>{
        if(sessionStorage.getItem("phone") != null){
            navigate("/");
        }
    })
    return (
        <Container fluid>
            <Row className="justify-content-md-center back">
                <LoginFormulario></LoginFormulario>
            </Row>
        </Container>
      );
}