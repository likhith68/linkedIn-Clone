import React, { useState } from 'react';
import './Nav.css';

function Nav({active,image,text,img}) {

  return (
    <div className={`nav ${active && 'nav--active'}`}>
        <div className="header__list">
            <a>
                <img src={image} alt="" /><span>{text}
                {img && <img src={img} alt="" />}</span>
            </a>
        </div>
    </div>
  )
}

export default Nav
