import * as React from "react";
import passwordEncript from "../hooks/SeguridadKey";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {motion} from "framer-motion";
import imgMeta from "../assets/img/login.jpg";
import { BsEnvelopeFill, BsPeopleFill, BsLockFill, BsFillPersonFill, BsPhone} from "react-icons/bs";
import {getRegisterRequest} from "../api/send.login.js"
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import hack from "../logo.svg";
import {
    useNavigate 
  } from "react-router-dom";

function RegistroFormulario() {
    const [disbaledB, changeDiable] = React.useState(false);
    const [valueInputE, changeInputE] = React.useState("");
    const [validarE, changeValidarE] = React.useState(0);

    const [valueInputP, changeInputP] = React.useState("");
    const [validarP, changeValidarP] = React.useState(0);

    const [valueInputN, changeInputN] = React.useState("");
    const [validarN, changeValidarN] = React.useState(0);


    const [valueInputA, changeInputA] = React.useState("");
    const [validarA, changeValidarA] = React.useState(0);

    const [errorSend, changeError] = React.useState("");


    const [valueInpuPH, changeInputPH] = React.useState("");
    const [validarPH, changeValidarPH] = React.useState(0);

    const [SendDatax, Sendchange] = React.useState(0);
    const [Formularios, changeFormularios] = React.useState(true);
    const [Animacion, changeAni] = React.useState(false);

    const [showA, setShowA] = React.useState(false);
    const toggleShowA = () => setShowA(!showA);
    const [dataRespuesta, changeRespuesta] = React.useState("");
    let navigate = useNavigate();

    const validateInput = (value, caso, data) =>{
        Sendchange(1);
        let regx;
        let ValidarTipo = "";
        if(caso === "Email"){
            ValidarTipo = "valEmail";
            regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        }else if(caso === "password"){
            ValidarTipo = "valPass";
            regx = /^[0-9A-Za-z#$%&-_)(/*]{1,30}$/;
        }else if(caso === "Letras"){
            ValidarTipo = "valLastName";
            regx = /^[A-Za-z ]{1,30}$/;
        }else if(caso === "Letras1"){
            ValidarTipo = "valName";
            regx = /^[A-Za-z ]{1,30}$/;
        }else if(caso === "Phone"){
            ValidarTipo = "valPhone";
            regx = /^[0-9 +]{1,30}$/;
        }

        let respuesta = regx.test(value);
        if(respuesta){
            data.style = "border-color:green";
            if(ValidarTipo === "valPass"){
                changeValidarP(1);
            }
            if(ValidarTipo === "valEmail"){
                changeValidarE(1);
            }
            if(ValidarTipo === "valLastName"){
                changeValidarA(1);
            }
            if(ValidarTipo === "valName"){
                changeValidarN(1);
            }
            if(ValidarTipo === "valPhone"){
                changeValidarPH(1);
            }
        }else{
            data.style = "border-color:red";
            if(ValidarTipo === "valPass"){
                changeValidarP(0);
            }
            if(ValidarTipo === "valEmail"){
                changeValidarE(0);
            }
            if(ValidarTipo === "valLastName"){
                changeValidarA(0);
            }
            if(ValidarTipo === "valName"){
                changeValidarN(0);
            }
            if(ValidarTipo === "valPhone"){
                changeValidarPH(0);
            }
        }
    }

    const sendData = async () =>{
        changeDiable(true);
        if(validarE === 1 && validarP === 1 && validarN === 1 && validarA === 1 && validarPH === 1 && SendDatax === 1){
            let respuesta = getRegisterRequest(valueInpuPH, valueInputE, valueInputN, valueInputA, (await passwordEncript(valueInputP)));
            if((await respuesta).data["message"] === "Add information in all inputs!"){
                changeError("Add information in all inputs!")
                changeDiable(false);
            }
            if((await respuesta).data["message"] === "Existing mail!"){
                changeError("Existing mail!")
                changeDiable(false);
            }
            if((await respuesta).data["message"] === "Existing phone!"){
                changeError("Add information in all inputs!")
                changeDiable(false);
            }
            if((await respuesta).data["message"] === "Good!"){
                changeRespuesta("Register Complet!");
                toggleShowA();
                sessionStorage.setItem("name", valueInputN)
                sessionStorage.setItem("last", valueInputA)
                sessionStorage.setItem("phone", valueInpuPH)
                sessionStorage.setItem("rol", "2")
                sessionStorage.setItem("email", valueInputE)
                setTimeout(() =>{
                    navigate("/");
                },1900)
            }
        }else{
            changeError("Add information in all inputs!")
            changeDiable(false);
        }
    }
  return (
    <Col xs lg="5" className='arrivals-form'>
        <motion.div
            className='pantalla-centro-register'
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
                <Row className={(!Formularios)? "mb-0 opacidad" : "mb-0 opacidad-off"} style={{opacity:(!Formularios)?"0":"1"}}>
                    <Form.Label style={{display:"flex", justifyContent:"center"}} >Register</Form.Label>
                    <Form.Group className="mb-0 arrivals-input" style={{height: "auto",margin: "0px"}}  controlId="Name">
                        
                        <Form.Control type="text" placeholder="Name" onChange={(e) => {changeInputN(e.target.value)}} onBlur={(e) => validateInput(valueInputN, 'Letras1', e.target) } />
                        <div className="circle-email">
                            <BsPeopleFill style={{color:"#fff", margin: "auto"}} />
                        </div>
                        <Form.Text className="error-login" style={{color:"red!important"}}>
                            {(validarN === 0 && SendDatax === 1 )? "Invalid name!" : " " }
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-0 arrivals-input" style={{height: "auto",margin: "0px"}}  controlId="Apellido">
                        <Form.Control type="text" placeholder="Lastname" onChange={(e) => {changeInputA(e.target.value)}} onBlur={(e) => validateInput(valueInputA, 'Letras', e.target) } />
                        <div className="circle-email">
                            <BsPeopleFill style={{color:"#fff", margin: "auto"}} />
                        </div>
                        <Form.Text className="error-login" style={{color:"red!important"}}>
                            {(validarA === 0 && SendDatax === 1 )? "Invalid last name!!" : " " }
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-0 arrivals-input" style={{height: "auto",margin: "0px"}}  controlId="formBasicPassword">
                        <Form.Control type="text" placeholder="Email" onChange={(e) => {changeInputE(e.target.value)}} onBlur={(e) => validateInput(valueInputE, 'Email', e.target) } />
                        <div className="circle-email">
                            <BsEnvelopeFill style={{color:"#fff", margin: "auto"}} />
                        </div>
                        <Form.Text className="error-login" style={{color:"red!important"}}>
                            {(validarE === 0 && SendDatax === 1 )? "Invalid email!" : " " }
                        </Form.Text>
                    </Form.Group>


                    <Form.Group className="mb-0 arrivals-input" style={{height: "auto",margin: "0px"}}  controlId="formBasicPassword">
                        <Form.Control type="text" placeholder="Phone" onChange={(e) => {changeInputPH(e.target.value)}} onBlur={(e) => validateInput(valueInpuPH, 'Phone', e.target) } />
                        <div className="circle-email">
                            <BsPhone style={{color:"#fff", margin: "auto"}} />
                        </div>
                        <Form.Text className="error-login" style={{color:"red!important"}}>
                            {(validarPH === 0 && SendDatax === 1 )? "Invalid phone!" : " " }
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-0 arrivals-input" style={{height: "auto",margin: "0px"}}  controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" onChange={(e) => {changeInputP(e.target.value)}} onBlur={(e) => validateInput(valueInputP, 'password', e.target) } />
                        <div className="circle-email">
                            <BsLockFill style={{color:"#fff", margin: "auto"}} />
                        </div>
                        <Form.Text className="error-login" style={{color:"red!important"}}>
                            {(validarP === 0 && SendDatax === 1 )? "Invalid password!" : " " }
                        </Form.Text>
                    </Form.Group>
                    <p className="error-login" style={{color:"red!important"}}>{errorSend}</p>
                    <Col className="mb-0 input-login">
                        <motion.button whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}  disabled={disbaledB}  className="btn btn-primary" onClick={()=>{sendData()}}  style={{margin:"auto"}} type="button">
                            Register
                        </motion.button>
                    </Col>
                </Row>
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

export default RegistroFormulario;