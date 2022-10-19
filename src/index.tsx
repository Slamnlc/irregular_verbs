import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import {Flip, ToastContainer} from "react-toastify";

const RouterTag = process.env.NODE_ENV === 'development' ? BrowserRouter : HashRouter

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <RouterTag>
        <Routes>
            <Route path="/*" element={<App/>}/>
        </Routes>
        <ToastContainer
            className="toast-position"
            transition={Flip}
            limit={3}
            draggablePercent={60}
            theme="colored"
        />
    </RouterTag>
);
