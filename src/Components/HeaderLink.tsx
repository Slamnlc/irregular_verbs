import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";

interface HeaderLinkProps {
    text: string
    urlLink: string
}

const HeaderLink: FC<HeaderLinkProps> = ({text, urlLink}) => {
    const navigate = useNavigate();

    return (
        <div className="header-link" onClick={() => navigate(urlLink)}>{text}</div>
    );
};

export default HeaderLink;
