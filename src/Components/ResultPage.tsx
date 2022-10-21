import React, {useEffect} from 'react';
import {getQuiz} from "../utils";
import {useNavigate} from "react-router-dom";
import Result from "./Result";
import {Button} from "react-bootstrap";

const ResultPage = () => {
    const quiz = getQuiz();
    const navigate = useNavigate();

    useEffect(() => {
        if (!quiz || Object.keys(quiz).length === 0) {
            navigate('/')
        }
        if (quiz?.active! < quiz?.count!) {
            navigate('/quiz')
        }

        console.log(quiz)


    }, [])


    return (
        <>
            <div className="results-div margin-top_30">
                {quiz?.answers!.map((el, index) => {
                    return <Result key={`answer-${index}`} item={el} index={index + 1} type={quiz?.type!}/>
                })}
            </div>
            <div className="flex-center margin-top_30 margin-bottom-30">
                <Button id="submit" type="submit" className="start-btn" onClick={() => navigate('/')}>
                    New quiz
                </Button>
            </div>
        </>
    );
};

export default ResultPage;
