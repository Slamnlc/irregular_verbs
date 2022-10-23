import React from 'react';
import Footer from "../Pages/Footer";
import {Outlet} from "react-router-dom";
import Header from "../Pages/Header";
import "../App.css"

const Service = () => {
    return (
        <>
            <Header/>
            <div className="body-content show">
                <Outlet/>
            </div>
            <Footer/>
        </>
    );
};

export default Service;
