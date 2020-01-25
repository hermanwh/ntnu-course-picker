import React, { useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { IoIosHeart } from "react-icons/io";

const Footer = props => {

  return (
    <div className="FooterWrapper">
        <div className="row">
            <div className="col-12">
                <h5>Made with love by</h5>
                <h3>Herman Wika Horn</h3>
                <h6>with contributions from</h6>
                <h6>Sander, Isabel and Håkon</h6>
                <br></br>
                <br></br>
            </div>
        </div>
    </div>
  );
}; 

export default Footer;
