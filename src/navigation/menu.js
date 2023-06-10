// @ts-nocheck
import * as React from "react";
import { Container } from "react-bootstrap";
import {
  Outlet,
  Link,
  useLocation,
  useNavigate 
} from "react-router-dom";

import Header from '../components/HeaderWeb';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Footer from '../components/FooterWeb';
import imgLogo from "../logo.svg";
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Menu() {
    
    let provider;

    const [haveMetamask, sethaveMetamask] = React.useState(true);
    const [accountAddress, setAccountAddress] = React.useState('');
    const [accountBalance, setAccountBalance] = React.useState('');
    const [isConnected, setIsConnected] = React.useState(false);
    const [isLogeadoSistem, changeLogeado] = React.useState(false);
    const [dataRespuesta, changeRespuesta] = React.useState("");
    const [showA, setShowA] = React.useState(false);
    const toggleShowA = () => setShowA(!showA);
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let location = useLocation();
    let navigate = useNavigate();





    React.useEffect(() => {
        if(sessionStorage.getItem("session_On")){
            changeLogeado(true);
        }else{
            changeLogeado(false);
        }
        
    }, [location.pathname]);

    const closeApp = () =>{
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("last");
        sessionStorage.removeItem("phone");
        sessionStorage.removeItem("rol");
        sessionStorage.removeItem("email");
        navigate("/");
    }
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" className="menu-hack">
            <Container style={{minWidth: "100%"}}>
                <Navbar.Brand>
                    <Link to="/"><img className="img-hack-logo" src={imgLogo} alt="Logo" /></Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>
                            <Link className={(location.pathname === "/Home" || location.pathname === "/")? "active-Menu" : " "} to="/Home"  onClick={()=>{window.location = "#ini"}}>Home</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link className={(location.pathname === "/Home#about")? "active-Menu" : " "} to="#about" onClick={()=>{window.location = "#about"}}>About</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link className={(location.pathname === "#News")? "active-Menu" : " "} to="#News">News</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link className={(location.pathname === "#Team")? "active-Menu" : " "} to="#Team">Team</Link>
                        </Nav.Link>
                        {
                            (sessionStorage.getItem("phone") === null)?
                            <> </>
                            :
                            <Nav.Link>
                                <Link className={(location.pathname === "/Users")? "active-Menu" : " "} to="/Users">Users</Link>
                            </Nav.Link>
                        }
                    </Nav>

                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                        {
                        (sessionStorage.getItem("phone") === null)?
                            <><Nav.Link eventKey={1}>
                                    <Link className={(location.pathname === "/login") ? "active-Menu" : " "} to="/login">Login</Link>
                            </Nav.Link><Nav.Link eventKey={2}>
                                    <Link className="remove_nav" to="/Register"><Button to="/Register">Register</Button></Link>
                            </Nav.Link></>
                        :
                        <NavDropdown title={"Hi, "+sessionStorage.getItem("name")+" "+sessionStorage.getItem("last")} style={{marginRight: "1rem"}} id="basic-nav-dropdown">
                            <NavDropdown.Item to="/app/Historia">
                                <Nav.Link>
                                    <Link className={(false)? "active-Menu" : " "} to="/Profile">Profile</Link>
                                </Nav.Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item to="/app/Historia">
                                <Nav.Link>
                                    <Link className={(false)? "active-Menu" : " "} to="/History">History</Link>
                                </Nav.Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item to="/app/Historia">
                                <Nav.Link>
                                    <Link className={(false)? "active-Menu" : " "} onClick={() => {closeApp()}}>Exit</Link>
                                </Nav.Link>
                            </NavDropdown.Item>
                        </NavDropdown>}
                </Navbar.Collapse>
          </Container>
        </Navbar>
        <Header></Header>
        <Outlet />
        <Footer></Footer>
      </div>
    );
}