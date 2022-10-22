import React, {createRef, FC, useEffect} from 'react';
import {QuizProps, quizTypeData} from "../Utils/types";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {getQuestion} from "../Utils/utils";
import ProgressBar from "../Components/ProgressBar";
import DivInput from "../Components/DivInput";
import CustomForm from "../Components/CustomForm";
import OxfordDictionaryLink from "../Components/OxfordDictionaryLink";


const Quiz: FC<QuizProps> = ({quiz, updateQuiz, validateUserAnswer}) => {
    const navigate = useNavigate();
    const ref = createRef<HTMLInputElement>();

    const keys = (quiz) ? quiz?.keys : []
    const activeKey = (quiz) ? keys[quiz.active! - 1] : ''
    const description = quiz?.type === 'all' ? "Specify by comma" : undefined

    const translation = quiz?.translation
        ? activeKey !== undefined
            ? `(${quiz.questions![activeKey].translation[0]})`
            : ''
        : ''

    useEffect(() => {
        if (quiz === null) {
            navigate('/')
        } else if (quiz!.active! > quiz?.count!) {
            navigate('/result')
        }
    }, [quiz?.active])


    const onClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        validateUserAnswer!(ref.current?.value!)
        // @ts-ignore
        ref.current.value = ""
        ref.current?.focus()

    }

    return (
        <CustomForm id="quiz-form" onSubmit={onClick}>
            <h3 className="margin-bottom-30">{quizTypeData[quiz?.type!]}</h3>
            <ProgressBar quiz={quiz!}/>
            <OxfordDictionaryLink infinitive={activeKey} wrapClass="margin-top-20"/>
            <h2 className="h3 mb-3 fw-normal no-select">{getQuestion(activeKey, quiz?.type!)} {translation}</h2>

            <DivInput id="input-question" wrapExtraClass="flex-center flex-column" ref={ref} type="text"
                      autoComplete="off" spellCheck="false" autoCorrect="off"
                      style={{width: "70%"}} description={description} required autoFocus/>
            <div className="start-btn-div">
                <Button id="submit" type="submit" className="start-btn">
                    {quiz ? quiz?.active === quiz!.count! - 1 ? "Finish" : "Confirm": <></>}
                </Button>
            </div>
        </CustomForm>
    );
};

export default Quiz;
