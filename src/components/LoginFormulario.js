import * as React from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import imgMeta from "../assets/img/login.jpg";
import Seguridad from '../hooks/SeguridadKey';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import hack from "../logo.svg";
import {motion} from "framer-motion";
import { BsFillPersonFill, BsPeopleFill, BsLockFill } from "react-icons/bs";
import {getLoginRequest, getRecuperar} from "../api/send.login.js"
import {
    useNavigate 
  } from "react-router-dom";
import passwordEncript from "../hooks/SeguridadKey";

function LoginFormulario() {
    const [disbaledB, changeDiable] = React.useState(false);

    const [valueInputE, changeInputE] = React.useState("");
    const [validarE, changeValidarE] = React.useState(1);

    const [valueInputP, changeInputP] = React.useState("");
    const [validarP, changeValidarP] = React.useState(1);

    const [Formularios, changeFormularios] = React.useState(true);

    const [Animacion, changeAni] = React.useState(false);
    const [showA, setShowA] = React.useState(false);
    const toggleShowA = () => setShowA(!showA);

    const [show, setShow] = React.useState(false);
    const [dataRespuesta, changeRespuesta] = React.useState("");
    let navigate = useNavigate();

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
                data.style = "border-color:red";
                if(ValidarTipo === "valEmail"){
                    changeValidarE(0);
                    return;
                }
            }
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
        }else{
            data.style = "border-color:red";
            if(ValidarTipo === "valPass"){
                changeValidarP(0);
            }
            if(ValidarTipo === "valEmail"){
                changeValidarE(0);
                return;
            }
        }
    }
    const sendLogin = async () =>{
        changeDiable(true);
        if(validarE === 1 && validarP === 1 && valueInputE != "" && valueInputP != ""){
            let respuesta = getLoginRequest(valueInputE, (await passwordEncript(valueInputP)));
            if((await respuesta).data["message"] === "Add information in all inputs!"){
                changeValidarE(0);
                changeDiable(false);
            }
            if((await respuesta).data["message"] === "Good!"){
                changeValidarE(1);
                toggleShowA();
                sessionStorage.setItem("name", (await respuesta).data["data"][0]["name"])
                sessionStorage.setItem("last", (await respuesta).data["data"][0]["lastname"])
                sessionStorage.setItem("phone", (await respuesta).data["data"][0]["phone"])
                sessionStorage.setItem("rol", (await respuesta).data["data"][0]["rol"])
                sessionStorage.setItem("email", (await respuesta).data["data"][0]["email"])
                changeRespuesta("Login success!");

                setTimeout(() =>{
                    navigate("/");
                },1900)
            }
        }else{
            changeValidarE(0);
            changeDiable(false);
        }
    }
    const sendEmail = async () =>{
        changeDiable(true);
        if(validarE === 1 && valueInputE != ""){
            let respuesta = getRecuperar(valueInputE);
            if((await respuesta).data["message"] === "Add information in all inputs!"){
                changeRespuesta("Error!");
                toggleShowA();
                changeDiable(false);
            }
            if((await respuesta).data["message"] === "Good!"){
                changeRespuesta("Change success!");
                toggleShowA();
                setTimeout(() =>{
                    navigate("/");
                },1900)
            }
        }else{
            changeRespuesta("Error!");
            toggleShowA();
            changeDiable(false);
        }
    }

  return (
    <Col xs lg="4" className='arrivals-form'>
        <motion.div
            className='pantalla-centro-card'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 1,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.08]
            }}
        >
            <Form>
                <div className="img-back">
                    <div className="container-img">
                        <img src={imgMeta} className="img-form"></img>
                    </div>
                </div>
            {(!Animacion)?
            <Row className={(!Formularios)? "mb-3 opacidad" : "mb-3 opacidad-off"} style={{opacity:(!Formularios)?"0":"1"}}>
                <Form.Group className="mb-3 arrivals-input" style={{height: "70px",margin: "0px"}} controlId="formBasicEmail">
                    <Form.Label style={{display:"flex", justifyContent:"center"}} >Login</Form.Label>
                    <Form.Control type="text" placeholder="Email" onChange={(e) => {changeInputE(e.target.value)}} onBlur={(e) => validateInput(valueInputE, 'Email', e.target) } />
                    <div className="circle-email">
                        <BsFillPersonFill style={{color:"white", margin: "auto"}} />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 arrivals-input" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" onChange={(e) => {changeInputP(e.target.value)}} onBlur={(e) => validateInput(valueInputP, 'password', e.target) } />
                    <div className="circle-email">
                        <BsLockFill style={{color:"white", margin: "auto"}} />
                    </div>
                    <Form.Text className="error-login" style={{color:"red!important"}}>
                        {(validarP === 0 || validarE === 0)? "Email or password Incorrect" : " " }
                    </Form.Text>
                </Form.Group>
                <Col xl="12" className="mb-0 input-login">
                    <motion.button whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }} className="btn btn-primary"  disabled={disbaledB}  style={{margin:"auto"}} type="button" onClick={() => {sendLogin()}}>
                        Login
                    </motion.button>
                </Col>
                <Col xl="12" className="pt-4 input-login">
                    <motion.a whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }} style={{margin:"auto"}}  disabled={!Formularios} onClick={() =>{changeFormularios(!Formularios);setTimeout(()=>{changeAni(!Animacion)},500)}} type="button">
                        Recover Password
                    </motion.a>
                </Col>
            </Row>
            : 
            <Row className={(!Formularios)? "mb-3 opacidad-off" :"mb-3 opacidad"}  style={{opacity:(!Formularios)?"1":"0"}}>
                <Form.Group className="mb-3 arrivals-input" style={{height: "70px",margin: "0px"}} controlId="formBasicEmail">
                    <Form.Label style={{display:"flex", justifyContent:"center"}} >Recover Password</Form.Label>
                    <Form.Control type="text" placeholder="Username o Email" onChange={(e) => {changeInputE(e.target.value)}} onBlur={(e) => validateInput(valueInputE, 'EmailOUser', e.target) } />
                    <div className="circle-email">
                        <BsFillPersonFill style={{color:"white", margin: "auto"}} />
                    </div>
                </Form.Group>


                <Col xl="12" className="mb-1 pt-4 pb-4 input-login">
                    <motion.button whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }} disabled={disbaledB}  className="btn btn-primary" style={{margin:"auto"}}  type="button" onClick={() =>{sendEmail()}}> 
                        Recover
                    </motion.button>
                </Col>
                <br></br>
                <Col xl="12" className=" input-login">
                    <motion.a whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }} style={{margin:"auto"}}  disabled={Formularios}  onClick={() =>{changeFormularios(!Formularios);setTimeout(()=>{changeAni(!Animacion)},500)}}  type="button">
                        Login
                    </motion.a>
                </Col>
            </Row>
            }
            </Form>
        </motion.div>
        <ToastContainer className="position-fixed card-Arrivals" position={'bottom-start'}>
                <Toast delay={3000} show={showA} onClose={toggleShowA}>
                    <Toast.Header>
                        <img
                        src={hack}
                        className="rounded me-2 card-img"
                        alt=""
                        />
                        <strong className="me-auto">Sistem</strong>
                        <small>Now</small>
                    </Toast.Header>
                    <Toast.Body><strong className="me-auto">{dataRespuesta}</strong></Toast.Body>
                </Toast>
        </ToastContainer>
    </Col>
  );
}

export default LoginFormulario;