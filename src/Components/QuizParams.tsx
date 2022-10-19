import React, {createRef, FC} from 'react';
import {Button, Form} from "react-bootstrap";
import "./gen.css"
import {QuizProps, QuizType, quizTypeData} from "../types";
import {useNavigate} from "react-router-dom";

const QuizParams: FC<QuizProps> = ({createNewQuiz}) => {

    const wordNumber = createRef<HTMLInputElement>();
    const quizType = createRef<HTMLSelectElement>()
    const navigate = useNavigate();

    const onClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        createNewQuiz!(quizType.current?.value as QuizType, +wordNumber.current?.value!)
        navigate('/quiz')
    }

    return (
        <main className="quiz-params">
            <Form id="login-form" action="" onSubmit={onClick}>
                <h1 className="h3 mb-3 fw-normal">Parametrize your quiz!</h1>
                <div className="form-floating margin-top_30">
                    <label htmlFor="questionsCount">Number of questions</label>
                    <input
                        id="questionsCount"
                        ref={wordNumber}
                        className="form-control centralize-text"
                        placeholder="Insert number of words in quiz. Maximum is 20"
                        defaultValue={10}
                        type="number"
                        max={20}
                        min={1}
                        aria-describedby="questionsCountHelp"
                    />
                    <small id="questionsCountHelp" className="form-text text-muted">
                        Insert number of words in quiz. Maximum is 20
                    </small>
                </div>
                <div className="form-group margin-top_15">
                    <label htmlFor="quizType">Select quiz type</label>
                    <select className="form-control centralize-text" id="quizType" ref={quizType} required>
                        {Object.entries(quizTypeData).map(([key, value]) => {
                            return <option value={key} key={key}>{value}</option>
                        })}
                    </select>
                </div>
                <div className="start-btn-div">
                    <Button id="submit" type="submit" className="start-btn">Start!</Button>
                </div>
            </Form>
        </main>
    );
};

export default QuizParams;
