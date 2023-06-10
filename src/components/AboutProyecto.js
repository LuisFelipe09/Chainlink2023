import {Col, Form, ProgressBar, Card, Row, Button, } from 'react-bootstrap';
import * as React from "react";
import {motion} from "framer-motion";
export default function InicoProyecto() {
    const [class1, addClass1] = React.useState(0);
    const [scrolling, setScrolling] = React.useState(false);
    const [scrollTop, setScrollTop] = React.useState(0);

    // @ts-ignore
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    }
    React.useEffect(() =>{
      window.addEventListener('scroll', onScroll);
    }) 

    React.useEffect(() => {

        if(scrollTop > 390){
          addClass1(1);
        }


    }, [scrollTop]);

    return (
      <Col lg="12" id="about"  className='p-5 degradate' >
        <Row xl="12" className="justify-content-md-center">
            <Col lg="6" sm="12"  className={class1 === 1?"opacidad text-justify textProject" :"text-justify textProject"}>
            <motion.div
                className="img-box"
                whileHover={{ scale: [null, 1.05, 1.03] }}
                transition={{ duration: 0.7 }}
                />
            </Col>
            <Col lg="6" sm="12"  className={class1 === 1?"opacidad text-justify textProject" :"text-justify textProject"}>
                    <br></br>
                    <h1>Name proyect Awesome </h1>
                    <br></br>
                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam impedit sed numquam architecto hic, eveniet dolorum a repellat sint aut facere nesciunt totam! Tempore ad quidem cum ut tempora eos! Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam impedit sed numquam architecto hic, eveniet dolorum a repellat sint aut facere nesciunt totam! Tempore ad quidem cum ut tempora eos!
                    </p>
                    <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className='btn btn-primary'
       
                    >whatsapp bot</motion.a>
            </Col>
        </Row>
      </Col>
    )
}
