import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";


const Navbar = props => {
  const [selectedPage, setSelectedPage] = useState("Logo");

  return (
    <div className="NavbarWrapper">
            <div className={"NavElement " + (selectedPage === "/" && "Selected")}>
                <Link to="/">Hjem</Link>
            </div>

            <div
                className={
                "NavElement " + (selectedPage === "/coursePicker" && "Selected")
                }
            >
                <Link to="/coursePicker">App</Link>
            </div>
    </div>
  );
};

export default Navbar;
