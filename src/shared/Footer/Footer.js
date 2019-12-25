import React, { useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";


const Footer = props => {

  return (
    <div className="FooterWrapper">
        <div className="row">
            <div className="col-12">
                <h5>Made with love by</h5>
                <h3>Herman Wika Horn</h3>
                <h5>with contributions from</h5>
                <h4>--------</h4>
            </div>
        </div>
    </div>
  );
};

export default Footer;
