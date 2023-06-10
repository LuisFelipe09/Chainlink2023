import {Col, Row, ProgressBar, Card} from 'react-bootstrap';
import React, { useState } from 'react';
import img01 from '../assets/img/default.jpg';
import AliceCarousel from 'react-alice-carousel';
import arma01 from '../assets/img/armas/01.png';
import arma02 from '../assets/img/armas/02.png';
import arma03 from '../assets/img/armas/03.png';
import Button from 'react-bootstrap/Button';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import imgArrivals from '../assets/img/logo.webp';
import { BsFillPersonFill, BsLockFill } from "react-icons/bs";
import Form from 'react-bootstrap/Form';
import Seguridad, { getUrl, keyDatacount } from '../hooks/SeguridadKey';
import MyArma from '../components/my-armas';

export default function PerfilUser() {
    const [dataRespuesta, changeRespuesta] = React.useState("");
    const [showA, setShowA] = React.useState(false);
    const toggleShowA = () => setShowA(!showA);

    const handleDragStart = (e) => e.preventDefault();
    const [valueInputE, changeInputE] = React.useState("");
    const [validarE, changeValidarE] = React.useState(0);

    const [valueInputP, changeInputP] = React.useState("");
    const [validarP, changeValidarP] = React.useState(1);

    const [valueInputPx1, changeInputPx1] = React.useState("");
    const [validarPx1, changeValidarPx1] = React.useState(1);

    const [valueInputPx2, changeInputPx2] = React.useState("");
    const [validarPx2, changeValidarPx2] = React.useState(1);

    const [valueInputA, changeInputA] = React.useState("");
    const [validarA, changeValidarA] = React.useState(1);

    const [valueInputN, changeInputN] = React.useState("");
    const [validarN, changeValidarN] = React.useState(1);

    const [necesita, changeNecesita] = React.useState(true);
    const [Formularios, changeFormularios] = React.useState(true);

    const [errores, changeErrores] = React.useState("");
    React.useEffect( () => {
        if(sessionStorage.getItem("nombres") !== ""){
            changeNecesita(false);
        }
    })
    const validateInput = (value, caso, data) =>{
        let regx = "";
        let ValidarTipo = "";
        if(caso === "Email"){
            ValidarTipo = "valEmail";
            regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        }else if(caso === "password"){
            ValidarTipo = "valPass";
            regx = /^[0-9A-Za-z#$%&-_)(/*]{1,30}$/;
        }else if(caso === "Numeros"){
            regx = /^[0-9]{1,30}$/;
        }else if(caso === "LetrasA"){
            regx = /^[A-Za-záéíóúÁÉÍÓÚ ]{3,40}$/;
            ValidarTipo = "LetrasA";
        }else if(caso === "LetrasN"){
            regx = /^[A-Za-záéíóúÁÉÍÓÚ ]{3,40}$/;
            ValidarTipo = "LetrasN";
        }else if(caso === "passwordx1"){
            regx = /^[0-9A-Za-z#$%&-_)(/*]{1,30}$/;
            ValidarTipo = "passwordx1";
        }else if(caso === "passwordx2"){
            regx = /^[0-9A-Za-z#$%&-_)(/*]{1,30}$/;
            ValidarTipo = "passwordx2";
        }
        let respuesta = regx.test(value);
        if(respuesta){
            data.style = "border-color:green";
            if(ValidarTipo === "valPass"){
                changeValidarP(1);
            }
            if(ValidarTipo === "valEmail"){
                changeValidarE(1);
                return;
            }
            if(ValidarTipo === "LetrasA"){
                changeValidarA(1);
                return;
            }
            if(ValidarTipo === "LetrasN"){
                changeValidarN(1);
                return;
            }
            if(ValidarTipo === "passwordx1"){
                changeValidarPx1(1);
                return;
            }
            if(ValidarTipo === "passwordx2"){
                changeValidarPx2(1);
                return;
            }
        }else{
            data.style = "border-color:red";
            if(ValidarTipo === "valPass"){
                changeValidarP(0);
                changeErrores("Contraseña invalida!")
                return;
            }
            if(ValidarTipo === "valEmail"){
                changeValidarE(0);
                changeErrores("Correo Electronico invalido!")
                return;
            }
            if(ValidarTipo === "LetrasA"){
                changeValidarA(0);
                changeErrores("Apellido invalido!")
                return;
            }
            if(ValidarTipo === "LetrasN"){
                changeValidarN(0);
                changeErrores("Nombre invalido!")
                return;
            }
            if(ValidarTipo === "passwordx1"){
                changeValidarPx1(0);
                changeErrores("Contraseña invalida!")
                return;
            }
            if(ValidarTipo === "passwordx2"){
                changeValidarPx2(0);
                changeErrores("Contraseña invalida!")
                return;
            }
        }
    }
    const ModificiarDatos = async ()  => {
        var data = {};
        if(necesita){
            if(validarE === 1 && validarP === 1 && validarN === 1 && validarA === 1){
                data = {key: Seguridad(), password: valueInputP, correoM: valueInputE, nombre: valueInputN, apellido: valueInputA, accounts: sessionStorage.getItem("metaMask")};
            }else{
                return;
            }
        }else{
            if(validarE === 1 && validarN === 1 && validarA === 1){
                data = {key: Seguridad(), correoN: valueInputE, nombreN: valueInputN, apellidoN: valueInputA, accounts: sessionStorage.getItem("metaMask")};
            }else{
                return;
            }
        }
       
        const requestOptions = {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(getUrl(), requestOptions).then(res => res.json()).then(
            (result) => {
                if(result["msj"] === "Error!"){
                    changeRespuesta("Error:  Modificar!");
                    setShowA(true);
                    setTimeout(() => {
                        setShowA(false);
                    }, 5000)
                }else{
                    sessionStorage.setItem("nombres", valueInputN);
                    sessionStorage.setItem("apellidos", valueInputA);
                    sessionStorage.setItem("correo", valueInputE);
                    changeRespuesta("Good: Modificado!");
                    setShowA(true);
                    setTimeout(() => {
                        setShowA(false);
                    }, 5000)
                }
            },
            (error) => {
            
            }
        )
    }

    const modificarPass = async () => {
        if(valueInputPx1 === valueInputPx2){
            var data = {};
            
            data = {key: Seguridad(), passwordM: valueInputPx1, accounts: sessionStorage.getItem("metaMask")};

            const requestOptions = {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
    
            fetch(getUrl(), requestOptions).then(res => res.json()).then(
                (result) => {
                    if(result["msj"] === "Error!"){
                        changeRespuesta("Error:  Modificar Password!");
                        setShowA(true);
                        setTimeout(() => {
                            setShowA(false);
                        }, 5000)
                    }else{
                        changeRespuesta("Good: Password Modificada!");
                        setShowA(true);
                        setTimeout(() => {
                            setShowA(false);
                        }, 5000)
                    }
                },
                (error) => {
                
                }
            )
        }else{
            changeRespuesta("Password Error:  No son iguales!");
            setShowA(true);
            setTimeout(() => {
                setShowA(false);
            }, 5000)
        }
    }

    const responsive = {
        250: {
            items: 1,
        },
        1024: {
            items: 3
        }
      }
    const items = [
        <div className="cardTeam" ><img src={arma01} className="cuadradoNFT" onDragStart={handleDragStart} role="presentation" /><span>NFT: <strong style={{color:"#7036b1"}}>XXX-XXXXXXXX-XX</strong></span></div>,
        <div className="cardTeam" ><img src={arma02} className="cuadradoNFT" onDragStart={handleDragStart} role="presentation" /><span>NFT: <strong style={{color:"#7036b1"}}>XXX-XXXXXXXX-XX</strong></span></div>,
        <div className="cardTeam" ><img src={arma03} className="cuadradoNFT" onDragStart={handleDragStart} role="presentation" /><span>NFT: <strong style={{color:"#7036b1"}}>XXX-XXXXXXXX-XX</strong></span></div>,
    ];
    return (
    <div style={{display:"contents"}}>
      <Col xs lg="9" sm="12" style={{ padding:"2vw"}}>
        <h1 style={{fontFamily:"Cyber", color:"#fff", textAlign:"center"}}>Perfil Arrivals</h1><br />
            <Card style={{display:"flex", flexDirection:"row", padding:"2vw"}}>
                <div className='cardPerfil-row-01'>
                    <img className='img-perfil' src={img01} />
                    <h3>Nombres: {sessionStorage.getItem("nombres")+" "+sessionStorage.getItem("apellidos")}</h3>
                    <h5>Wallet: <strong style={{color:"#7036b1"}}>{sessionStorage.getItem("metaMask")}</strong></h5>
                    <h5>Valor BNB: <strong style={{color:"#f58514"}}>0$</strong></h5>
                </div>
                <div className='cardPerfil-row-02'> 
                    <br></br>
                    <div className='cardPerfil-flex'>
                       <MyArma></MyArma>
                    </div>
                    <div className='cardPerfil-flex'>
                        ARV: <ProgressBar variant="success" animated now={60} />
                    </div>
                    <br></br>
                    <div className='cardPerfil-flex'>
                        Mini ARV: <ProgressBar variant="success" animated now={95} />
                    </div>
                </div>
            </Card>
      </Col>
      <Col xs lg="9" sm="12" style={{ padding:"2vw"}}>
        <h1 style={{fontFamily:"Cyber", color:"#fff", textAlign:"center"}}>Perfil Usuario</h1><br />
        <Card style={{display:"flex", padding:"2vw"}}>
        <Row className={(!Formularios)? "mb-3 opacidad" : "mb-3 opacidad-off"} style={{opacity:(!Formularios)?"0":"1"}}>
            <Form.Group as={Col} md="6" className="mb-3 arrivals-input" style={{height: "70px",margin: "0px"}} controlId="formBasicNombre">
                <Form.Control type="text" placeholder="Nombre" defaultValue={sessionStorage.getItem("nombres")} onChange={(e) => {changeInputN(e.target.value)}} onBlur={(e) => validateInput(valueInputN, 'LetrasN', e.target) } />
                <div className="circle-email">
                    <BsFillPersonFill style={{color:"black", margin: "auto"}} />
                </div>
            </Form.Group>

            <Form.Group as={Col} md="6" className="mb-3 arrivals-input" style={{height: "70px",margin: "0px"}} controlId="formBasicApellido">
                <Form.Control type="text" placeholder="Apellido" defaultValue={sessionStorage.getItem("apellidos")} onChange={(e) => {changeInputA(e.target.value)}} onBlur={(e) => validateInput(valueInputA, 'LetrasA', e.target) } />
                <div className="circle-email">
                    <BsFillPersonFill style={{color:"black", margin: "auto"}} />
                </div>
            </Form.Group>

            <Form.Group as={Col} md={necesita? "6" : "12"} className="mb-3 arrivals-input" style={{height: "70px",margin: "0px"}} controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Email" defaultValue={sessionStorage.getItem("correo")} onChange={(e) => {changeInputE(e.target.value)}} onBlur={(e) => validateInput(valueInputE, 'Email', e.target) } />
                <div className="circle-email">
                    <BsFillPersonFill style={{color:"black", margin: "auto"}} />
                </div>
            </Form.Group>
            {necesita?
            <Form.Group as={Col} md="6" className="mb-3 arrivals-input" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" onChange={(e) => {changeInputP(e.target.value)}} onBlur={(e) => validateInput(valueInputP, 'password', e.target) } />
                <div className="circle-email">
                    <BsLockFill style={{color:"black", margin: "auto"}} />
                </div>
            </Form.Group>
            : " "}

            <Col className="mb-0 input-login" style={{justifyContent:"center"}}>
                <Button variant="primary" style={{margin:"0", marginLeft:"10px"}} type="button" onClick={() => {ModificiarDatos()}}>
                    Modificiar
                </Button>
            </Col>
          </Row>
        </Card>
      </Col>
      {!necesita?
      <Col xs lg="9" sm="12" style={{ padding:"2vw"}}>
        <h1 style={{fontFamily:"Cyber", color:"#fff", textAlign:"center"}}>Modificar Password</h1><br />
        <Card style={{display:"flex", padding:"2vw"}}>
        <Row className={(!Formularios)? "mb-3 opacidad" : "mb-3 opacidad-off"} style={{opacity:(!Formularios)?"0":"1"}}>
            <Form.Group as={Col} md="6" className="mb-3 arrivals-input" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" onChange={(e) => {changeInputPx1(e.target.value)}} onBlur={(e) => validateInput(valueInputPx1, 'passwordx1', e.target) } />
                <div className="circle-email">
                    <BsLockFill style={{color:"black", margin: "auto"}} />
                </div>
            </Form.Group>
            
            <Form.Group as={Col} md="6" className="mb-3 arrivals-input" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Repetir Password" onChange={(e) => {changeInputPx2(e.target.value)}} onBlur={(e) => validateInput(valueInputPx2, 'passwordx2', e.target) } />
                <div className="circle-email">
                    <BsLockFill style={{color:"black", margin: "auto"}} />
                </div>
            </Form.Group>
            
            <Col className="mb-0 input-login" style={{justifyContent:"center"}}>
                <Button variant="primary" style={{margin:"0", marginLeft:"10px"}} type="button" onClick={() => {modificarPass()}}>
                    Modificiar Password
                </Button>
            </Col>
          </Row>
        </Card>
      </Col>
      : " "}
        <ToastContainer className="position-fixed card-Arrivals" position={'bottom-start'}>
            <Toast delay={3000} show={showA} onClose={toggleShowA}>
                <Toast.Header>
                        <img
                        src={imgArrivals}
                        className="rounded me-2 card-img-Arrivals"
                        alt=""
                        />
                        <strong className="me-auto">The Arrivals</strong>
                        <small>Ahora</small>
                    </Toast.Header>
                    <Toast.Body><strong className="me-auto">{dataRespuesta}</strong></Toast.Body>
                </Toast>
        </ToastContainer>
    </div>
    )
}