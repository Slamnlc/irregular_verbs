import React, {createRef, FC, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import "./gen.css"
import {DifficultLevels, difficultLevels, QuizProps, QuizType, quizTypeData} from "../types";
import {useNavigate} from "react-router-dom";
import DivSelect from "./DivSelect";

const QuizParams: FC<QuizProps> = ({createNewQuiz}) => {

    const wordNumber = createRef<HTMLInputElement>();
    const quizType = createRef<HTMLSelectElement>();
    const difficultLevel = createRef<HTMLSelectElement>();
    const navigate = useNavigate();
    const [translation, setTranslation] = useState<boolean>(false);
    const [addTranslation, setAddTranslation] = useState<boolean>(false);

    const onClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const questionCount = +wordNumber.current?.value!
        const difficult: DifficultLevels = +difficultLevel.current?.value!
        createNewQuiz!(quizType.current?.value as QuizType, questionCount, addTranslation, difficult)
        navigate('/quiz')
    }

    const onChange = () => {
        setTranslation(quizType.current?.value === 'translation')
    }

    const changeTranslation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddTranslation(event.target.checked)
    }

    return (
        <div className="flex">
            <main className="quiz-params">
                <Form id="quiz-params-form" action="" onSubmit={onClick}>
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
                    <DivSelect label="Select difficult type"
                               id="difficultLevel"
                               optionObject={difficultLevels}
                               refer={difficultLevel}
                    />
                    <DivSelect label="Select quiz type"
                               onChange={onChange}
                               id="quizType"
                               optionObject={quizTypeData}
                               refer={quizType}
                    />
                    {translation
                        ? <></>
                        : <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="addTranslation"
                                   onChange={changeTranslation}/>
                            <label className="form-check-label" htmlFor="addTranslation">
                                Add translation
                            </label>
                        </div>}
                    <div className="start-btn-div">
                        <Button id="submit" type="submit" className="start-btn">Start!</Button>
                    </div>
                </Form>
            </main>
        </div>
    );
};

export default QuizParams;
