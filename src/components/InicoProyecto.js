import {Col, Form, ProgressBar, Card, Row, Button, } from 'react-bootstrap';
import * as React from "react";
import {motion} from "framer-motion";
export default function AboutProyecto() {

    return (
      <Col lg="12" id="ini" className='pantalla-gris'>
        <Row xl="12" className="justify-content-md-center pantalla-Inicio">
            <Col lg="12" className='pantalla-carta'>
                <motion.div
                        className='pantalla-centro'
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 1,
                          delay: 0.5,
                          ease: [0, 0.71, 0.2, 1.08]
                        }}
                        >
                    <span>Welcome to</span>
                    <h1>Name proyect Awesome</h1>
                    <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className='btn btn-2'>About</motion.a>
                    <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className='btn btn-2'>Team</motion.a>
                </motion.div>
            </Col>
        </Row>
      </Col>
    )
}