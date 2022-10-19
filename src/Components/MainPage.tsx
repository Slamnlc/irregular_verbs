import React, {FC} from 'react';
import '../App.css'
import QuizParams from "./QuizParams";
import {QuizProps} from "../types";


const MainPage: FC<QuizProps> = ({createNewQuiz}) => {
    return (
        <QuizParams createNewQuiz={createNewQuiz}/>
    );
};

export default MainPage;
