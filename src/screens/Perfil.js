import PerfilUser from '../components/PerfilUsuario';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import React from 'react';

export default function Perfil(){
    let location = useLocation();
    let navigate = useNavigate();
    useEffect(() =>{
        if(!sessionStorage.getItem("session_On")){
            navigate("/Historia");
        }
      }, [location.pathname])
    return (
        <Container fluid>
            <Row className="justify-content-md-center">
                <PerfilUser></PerfilUser>
            </Row>
        </Container>
      );
}