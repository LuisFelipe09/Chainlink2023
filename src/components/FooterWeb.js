import * as React from "react";
import "../assets/css/style.css"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BsWhatsapp, BsDiscord, BsFacebook, BsInstagram } from "react-icons/bs";
import { Container } from "react-bootstrap";
import "react-alice-carousel/lib/alice-carousel.css";


export default function FooterWeb() {
    const [showA, setShowA] = React.useState(false);
  

    return (
        <Container fluid id="Hack">
            <Row lg="12">
                <Col sm="12" lg="3" className="hack-footer justify-content-md-center" style={{background:"#242424"}}>
                    <Row lg="12">
                        <Col sm="12"  xs lg="12">
                            <div className="circulos-div">
                                <a className="Cicrlce" href="#">
                                    <BsInstagram color="#fff" style={{width:'100%'}}></BsInstagram>
                                </a>
                                <a className="Cicrlce" href="#">
                                    <BsFacebook color="#fff" style={{width:'100%'}}></BsFacebook>
                                </a>
                                <a className="Cicrlce" href="#">
                                    <BsDiscord color="#fff" style={{width:'100%'}}></BsDiscord>
                                </a>
                                <a className="Cicrlce" href="#">
                                    <BsWhatsapp color="#fff" style={{width:'100%'}}></BsWhatsapp>
                                </a>
                            </div>
                            <div className="Footer">
                                <h6>© Hackaton 2023</h6>
                                <h6>503 ejemplo localidad numero 20212</h6>
                                <h6>Telefono: +57 00 000 00</h6>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xs sm="12" lg="9" style={{background:"#242424"}}>
                    <Row lg="12" className="footer-company">
                        <Col sm="12" lg="4">
                            <h5>Categorias</h5>
                            <Row lg="12">
                                <a href="#">item 1</a>
                                <a href="#">item 2</a>
                                <a href="#">item 3</a>
                                <a href="#">item 4</a>
                                <a href="#">item 5</a>
                            </Row>
                        </Col>
                        <Col sm="12" lg="4">
                            <h5>Redes sociales</h5>
                            <Row lg="12">
                                <a href="#">Discord</a>
                                <a href="#">Twitter</a>
                                <a href="#">Instagram</a>
                                <a href="#">Youtube</a>
                            </Row>
                        </Col>
                        <Col sm="12" lg="4">
                            <h5>Compañia</h5>
                            <Row lg="12">
                                <a href="#">About</a>
                                <a href="#">Policy & Terms</a>
                                <a href="#">Privacy Preferences</a>
                                <a href="#">Privacy</a>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}