import React from 'react';
import {getQuiz} from "../Utils/utils";
import HeaderLink from "../Components/HeaderLink";
import {useLocation} from "react-router-dom";

const Header = () => {
    const quiz = getQuiz();
    const location = useLocation()

    return (
        <div className="header">
            <HeaderLink text="New Quiz" urlLink="/"/>
            {quiz !== null && Object.keys(quiz).length > 0 && location.pathname !== '/result'
                ? <HeaderLink text="Active Quiz" urlLink="/quiz"/>
                : <></>
            }
            <HeaderLink text="Verbs Table" urlLink="/table"/>
        </div>
    );
};

export default Header;
