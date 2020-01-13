import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";


const Navbar = props => {
  const [selectedPage, setSelectedPage] = useState("Logo");

  return (
    <div className="NavbarWrapper">
            <div className={"NavElement " + (selectedPage === "/" && "Selected")}>
                <Link to="/"><h4 style={{'padding':'0px 0px 0px 0px', 'margin':'0px 0px 0px 0px'}}>Hjem</h4></Link>
            </div>

            <div
                className={
                "NavElement " + (selectedPage === "/coursePicker" && "Selected")
                }
            >
                <Link to="/coursePicker"><h4 style={{'padding':'0px 0px 0px 0px', 'margin':'0px 0px 0px 0px'}}>App</h4></Link>
            </div>
    </div>
  );
};

export default Navbar;
