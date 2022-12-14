import React from 'react';
import ReactLogo from "../Icons/ReactLogo";
import {openInNewTab} from "../Utils/utils";

const Footer = () => {

    const onClick = () => {
        openInNewTab('https://github.com/Slamnlc/irregular_verbs')
    }

    return (
        <div className="footer">
            <ReactLogo width={48} height={48} onClick={onClick}/>
        </div>
    );
};

export default Footer;
