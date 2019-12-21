import React, { useEffect, useState } from "react";
import "./Front.css";

const Front = ({ match }) => {

    return (
        <div>
            <h1>This is the front page</h1>
            <div className="container">
                <div class="row">
                    <div className="col-12">
                        <h3 style={{'color': 'red'}}>Her kommer det masse greier om hvordan man bruker appen wohooo</h3>
                    </div>
                    <div className="col-4">
                        Hei
                    </div>
                    <div className="col-4">
                        Hei
                    </div>
                    <div className="col-4">
                        Hei
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Front;