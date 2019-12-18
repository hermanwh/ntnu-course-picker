import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";


const Navbar = props => {
  const [selectedPage, setSelectedPage] = useState("Logo");

  return (
    <div className="NavbarWrapper">
            <div className={"NavElement " + (selectedPage === "/" && "Selected")}>
                <Link to="/">Home</Link>
            </div>

            <div
                className={
                "NavElement " + (selectedPage === "/subpage1" && "Selected")
                }
            >
                <Link to="/subpage1">
                <img src="add.svg" color="white" alt="add" />
                </Link>
            </div>
            <div
                className={"NavElement " + (selectedPage === "/subpage2" && "Selected")}
            >
                <Link to="/subpage2">
                <img src="list.svg" color="white" alt="list" />
                </Link>
            </div>
    </div>
  );
};

export default Navbar;
