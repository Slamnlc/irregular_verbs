import React from 'react';
import Footer from "./Footer";
import {Outlet} from "react-router-dom";
import Header from "./Header";
import "../App.css"

const Service = () => {
    return (
        <>
            <Header/>
            <div className="body-content">
                <Outlet/>
            </div>
            <Footer/>
        </>
    );
};

export default Service;
