import React from 'react';
import {getQuiz} from "../utils";
import HeaderLink from "./HeaderLink";

const Header = () => {
    const quiz = getQuiz();

    return (
        <div className="header">
            <HeaderLink text="New Quiz" urlLink="/"/>
            {quiz !== null && Object.keys(quiz).length > 0
                ? <HeaderLink text="Active Quiz" urlLink="/quiz"/>
                : <></>
            }
            <HeaderLink text="Verbs Table" urlLink="/table"/>
        </div>
    );
};

export default Header;
