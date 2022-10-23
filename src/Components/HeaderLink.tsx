import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";

interface HeaderLinkProps {
    text: string
    urlLink: string
}

const HeaderLink: FC<HeaderLinkProps> = ({text, urlLink}) => {
    const navigate = useNavigate();

    const openUrl = () => {
        document.querySelector('.body-content')!.classList.remove('show')
        setTimeout(() => {
            navigate(urlLink)
            document.querySelector('.body-content')!.classList.add('show')
        }, 600)

    }

    return (
        <div className="header-link" onClick={openUrl}>{text}</div>
    );
};

export default HeaderLink;
