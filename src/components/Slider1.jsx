import React, { useState } from 'react';
import '../styles/Slider.css'
import classNames from "../lib/classnames";


const Slider = (props)=>{
  const [track, setTrack] = useState({
    left: '0%',
    right: 'auto',
    width: '0%'
  });
  const [handle, setHandle] = useState({
    right: 'auto',
    transform: 'translateX(-50%)',
    left: '0%'
  });
  const handleStep = (e)=>{
    e.persist()
    console.log(e);
  }
  return (
    <div className={classNames('ant-slider', {
      'ant-slider-disabled': props.disabled
    })
    } style={{margin: '8px 0px'}}>
      <div className="ant-slider-rail"/>
      <div className="ant-slider-track" style={track} />
      <div className="ant-slider-step" onClick={handleStep} />
      <div className={classNames('ant-slider-handle',{
      
      })
      } style={handle} />
      <div className="ant-slider-mark"/>
    </div>
  )
}

Slider.defaultProps = {
  type: 'sss',
  min: 0,
  max: 50,
  value: 21,
  disabled: false,
}


export default Slider
