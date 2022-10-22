import React, {FC} from 'react';
import '../App.css'
import {QuizProps} from "../Utils/types";
import QuizParams from "./QuizParams"


const MainPage: FC<QuizProps> = ({createNewQuiz}) => {
    return (
        <QuizParams createNewQuiz={createNewQuiz}/>
    );
};

export default MainPage;
