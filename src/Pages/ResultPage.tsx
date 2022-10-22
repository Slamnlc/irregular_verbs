import React, {useEffect} from 'react';
import {getQuiz} from "../Utils/utils";
import {useNavigate} from "react-router-dom";
import Result from "../Components/Result";
import {Button} from "react-bootstrap";

const ResultPage = () => {
    const quiz = getQuiz();
    const navigate = useNavigate();
    const correct = quiz ? quiz.answers.filter(el => el.result).length : 0
    const passRate = quiz
        ? correct !== 0
            ? ((correct / quiz.count) * 100).toFixed(0)
            : 0
        : 0

    useEffect(() => {
        if (!quiz) {
            navigate('/')
        }
        if (quiz?.active! < quiz?.count!) {
            navigate('/quiz')
        }

    }, [])


    return (
        <>
            <div className="pass-rate-div">Pass rate is {passRate}% ({correct} / {quiz?.count})</div>
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
