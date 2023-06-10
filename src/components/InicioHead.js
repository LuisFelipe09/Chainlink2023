import {Col, Form, ProgressBar, Card, Row, Button} from 'react-bootstrap';
import * as React from "react";
import AliceCarousel from 'react-alice-carousel';
import img01 from '../assets/img/img01.png';
import img02 from '../assets/img/img02.png';
import img03 from '../assets/img/img03.png';
import { useSelector } from 'react-redux';
import { BsSearch, BsPeopleFill, BsLockFill } from "react-icons/bs";

export default function InicioHead() {
    const [valueInputE, changeInputE] = React.useState("");
    const [validarE, changeValidarE] = React.useState(1);
    const [validarP, changeValidarP] = React.useState(1);
    const [Formularios, changeFormularios] = React.useState(true);
    const validateInput = (value, caso, data) =>{
        let regx = "";
        let ValidarTipo = "";
        if(caso === "Email"){
            ValidarTipo = "valEmail";
            regx = /^[0-9A-Za-z#$%&-_ )(/*]{1,30}$/;
        }else if(caso === "password"){
            ValidarTipo = "valPass";
            regx = /^[0-9A-Za-z#$%&-_)(/*]{1,30}$/;
        }else if(caso === "Numeros"){
            regx = /^[0-9]{1,30}$/;
        }else if(caso === "EmailOUser"){
            ValidarTipo = "valEmail";
            regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let respuesta = regx.test(value);
            if(respuesta){
                data.style = "border-color:green";
                if(ValidarTipo === "valEmail"){
                    changeValidarE(1);
                    return;
                }
            }
            regx = /^[0-9A-Za-z#$%&-_)(/*]{1,30}$/;
            respuesta = regx.test(value);
            if(respuesta){
                data.style = "border-color:green";
                if(ValidarTipo === "valEmail"){
                    changeValidarE(1);
                    return;
                }
            }else{
                if(ValidarTipo === "valEmail"){
                    changeValidarE(0);
                    return;
                }
            }
        }
        let respuesta = regx.test(value);
        if(respuesta){
            data.style = "border-color:green";
            if(ValidarTipo === "valEmail"){
                changeValidarE(1);
                return;
            }
        }else{
            if(ValidarTipo === "valEmail"){
                changeValidarE(0);
                return;
            }
        }
    }
    return (
      <Col lg="12" style={{background: "#f1f1f1"}}>
        <Row xl="12" className="justify-content-md-center pt-5">
            <Col lg="7" >
                <h1 style={{color:"#000", textAlign:"center"}}>Busca los mejores <strong>Proyectos</strong> e invierte</h1><br />
                <Form>
                    <Row xl="12" className={"mb-3 opacidad-off"} style={{opacity:"1"}}>
                        <Col xl="10">
                        <Form.Group className="mb-3" style={{width:"100%", height: "70px",margin: "0px"}} controlId="project">
                            <Form.Control type="text" placeholder="Nombre del proyecto" onChange={(e) => {changeInputE(e.target.value)}} onBlur={(e) => validateInput(valueInputE, 'Email', e.target) } />
                            <div className="circle-email">
                                <BsSearch style={{ margin: "auto"}} />
                            </div>
                            
                        </Form.Group>
                        </Col>
                        <Col xl="2">
                            <Button className='buttonSeach'>Buscar</Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
      </Col>
    )
}