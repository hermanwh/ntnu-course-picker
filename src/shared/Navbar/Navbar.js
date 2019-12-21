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
                "NavElement " + (selectedPage === "/coursePicker" && "Selected")
                }
            >
                <Link to="/coursePicker">
                <img src="add.svg" color="white" alt="add" />
                </Link>
            </div>
            <div
                className={"NavElement " + (selectedPage === "/courseSummary" && "Selected")}
            >
                <Link to="/courseSummary">
                <img src="list.svg" color="white" alt="list" />
                </Link>
            </div>
    </div>
  );
};

export default Navbar;
