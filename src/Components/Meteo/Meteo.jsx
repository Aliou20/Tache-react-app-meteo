import "./Meteo.css";
import React from "react";
import Row from 'react-bootstrap/Row'
import { Col, Form} from "react-bootstrap";
import nuageImg from "../../assets/nuage.png"
import { useEffect, useState } from 'react';
import { getDataApi } from "../../getData";
import Description from "../Description/Description";
import ColdBg from '../../assets/cold.jpg'
import hotBg from '../../assets/hot.jpg'

function Meteo() {
  
  const [weather , setWeather] = useState(null)
  const [units , setUnits] = useState('metric')
  const [city , setCity] = useState("paris")
  const [bg , setBg] = useState(hotBg)

  useEffect(() => {
    async function fetchDataApi() {
      const data =  await getDataApi(city, units)
      setWeather(data)
      
      const bgTemp = units === "metric" ? 20 : 60;
      if(data.temp <= bgTemp) setBg(ColdBg)
      else setBg(hotBg)
    }
    fetchDataApi()

  }, [units,city]);

  function handleUnitsClick(e) {
    const button = e.currentTarget
    const currentUnits = button.innerText.slice(1)

    const isCelsius = currentUnits === "C";
    button.innerText = isCelsius ? '°F' : "°C"
    setUnits(isCelsius ? "metric" : "imperial")
  }

  function enterKeyPressed(e) {
    if(e.keyCode === 13) {
      setCity(e.currentTarget.value)
    }
  }
  
  
  return (
    <div className="meteo" style={{backgroundImage : `url(${bg})`}}>
      {weather && (
      <div className="container pt-4">
        <Row className=" conteneur_input mx-2 m-md-5 px-3 py-3 align-items-center rounded">
          <Col className="col-md-7 col-8">
            <Form.Group className="" controlId="exampleForm.ControlInput1">
              <Form.Control type="text" placeholder="Entrez votre ville..." className="input_ville" onKeyDown={enterKeyPressed} />
            </Form.Group> 
          </Col>
          <Col className="col-md-2 offset-md-3 offset-0 ">
            <div className="ms-auto py-2 rounded fw-bold unite" onClick={(e) => handleUnitsClick(e)}>°F</div>
          </Col>
        </Row>
        <Row className='conteneur_temperature m-md-5 mx-2 p-1 p-md-3  align-items-center rounded'>
          <Col className="col-md-6 col-6">
            <div className="fs-4 fw-bold">{`${weather.name} , ${weather.country}`}</div>
            <img src={nuageImg} alt='nuage' className="img w-50"/>
            <div className="fs-4">{weather.description} </div>
          </Col>
          <Col className="col-md-5 offset-md-1 offset-0 fs-md-3 col-6">
            <div className="fw-bold temperature">{`${weather.temp.toFixed()} °${units === 'metric' ? "C" : "F"}`}</div>
          </Col>
        </Row>
        <Description weather={weather} units={units}/>
      </div>
      )}
    </div>
  );
};

export default Meteo;
