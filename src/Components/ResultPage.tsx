import React, {useEffect} from 'react';
import {getQuiz} from "../utils";
import {useNavigate} from "react-router-dom";

const ResultPage = () => {
    const oldQuiz = getQuiz();
    const navigate = useNavigate();

    useEffect(() => {
        if (!oldQuiz || Object.keys(oldQuiz).length === 0) {
            navigate('/')
        }
        if (oldQuiz?.active! < oldQuiz?.count!) {
            navigate('/quiz')
        }

        console.log(oldQuiz)


    }, [])


    return (
        <div>
            Result
        </div>
    );
};

export default ResultPage;
