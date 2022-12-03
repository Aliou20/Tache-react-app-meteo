import "./Description.css";
import React from "react";
import { FaArrowDown, FaArrowUp, FaWind } from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";
import { Col, Row } from "react-bootstrap";


function Description({weather , units}) {
  const tempUnit = units === 'metric' ? "°C" : "°F"
  const windUnit = units === 'metric' ? "m/s" : "m/h"
  
  const cards = [
    {
      id : 1,
      icon : <FaArrowDown/>,
      title : "min",
      data : weather.temp_min,
      unit : tempUnit
    },
    {
      id : 2,
      icon : <FaArrowUp/>,
      title : "max",
      data : weather.temp_max,
      unit : tempUnit
    },
    {
      id : 3,
      icon : <BiHappy/>,
      title : "feels_like",
      data : weather.feels_like,
      unit : tempUnit
    },
    {
      id : 4,
      icon : <MdCompress/>,
      title : "pressure",
      data : weather.pressure,
      unit : "hPa"
    },
    {
      id : 5,
      icon : <MdOutlineWaterDrop/>,
      title : "humidity",
      data : weather.humidity,
      unit : "%"
    },
    {
      id : 6,
      icon : <FaWind/>,
      title : "wind speed",
      data : weather.speed,
      unit : windUnit
    }
  ];
  return (

      <Row className="justify-content-between gy-4 m-md-5 mx-2 align-items-center conteneur_details pb-5 mb-0" >
        {cards.map(({id , icon , title , data , unit}) => (
          <Col key={id} className="col-5  details p-3 rounded d-flex flex-column align-items-center">
            <div className="d-flex align-items-center">
              {icon}
              <div className="pe-2">{title}</div>
            </div>
            <div className="fw-bold fs-2"> {`${data} ${unit}`}</div>
          </Col>             
        ))}
      </Row>
    
  );
};

export default Description;
