
import { Container, Row, Col, Button } from 'react-bootstrap';
import  AboutProyecto  from '../components/AboutProyecto';
import InicoProyecto from '../components/InicoProyecto';

import { useEffect } from 'react';
import React from 'react';

export default function Inicio(){

    return (
        <Container fluid>
          <Row className="justify-content-md-center">
            <InicoProyecto></InicoProyecto>
            <AboutProyecto></AboutProyecto>
            
          </Row>
        </Container>
      );
}