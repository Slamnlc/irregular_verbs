import React, {createRef, FC, useEffect} from 'react';
import {QuizProps, quizTypeData} from "../types";
import {useNavigate} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {genDictionaryUrl, getCorrectAnswer, getQuestion, scrollTo, verifyAnswer} from "../utils";
import ProgressBar from "./ProgressBar";
import {toast} from "react-toastify";


const Quiz: FC<QuizProps> = ({quiz, updateQuiz}) => {
    const navigate = useNavigate();
    const ref = createRef<HTMLInputElement>();

    const keys = (Object.keys(quiz!).length !== 0) ? Object.keys(quiz!.questions!) : []
    const activeKey = keys[quiz!.active! - 1];
    const small = quiz?.type === 'all'
        ? <small id="allOption" className="form-text text-muted">
            Specify by comma
        </small>
        : <></>
    const translation = quiz?.translation ? `(${quiz.questions![activeKey].translation[0]})` : ''

    useEffect(() => {
        if (Object.keys(quiz!).length === 0) {
            navigate('/')
        }
        if (quiz!.active! > quiz?.count!) {
            navigate('/result')
        }
    }, [quiz])


    const onClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const arr = quiz!.answers
        const answer = ref.current?.value!.toLowerCase()!;
        const question = Object.keys(quiz?.questions!)[quiz?.active! - 1];
        const isCorrect = verifyAnswer(answer, question, quiz?.type!);
        const correctAnswer = getCorrectAnswer(question, quiz?.type!);
        if (!isCorrect) {
            switch (typeof correctAnswer) {
                case "string":
                    toast.error(correctAnswer);
                    break
                case "object":
                    if (typeof correctAnswer[0] === "string") {
                        toast.error(correctAnswer.join(', '))
                    } else {
                        toast.error(correctAnswer[0].join(', '))
                        // @ts-ignore
                        toast.error(correctAnswer[1].join(', '))
                    }
                    break
            }
        }
        arr?.push({
            answer: answer,
            result: isCorrect,
            correct: correctAnswer
        })
        updateQuiz!('active', quiz?.active! + 1)
        updateQuiz!('answers', arr)

        // @ts-ignore
        ref.current.value = ""
    }

    return (
        <div className="flex">
            <main className="quiz-params">
                <h3 className="margin-bottom-30">{quizTypeData[quiz?.type!]}</h3>
                <ProgressBar quiz={quiz!}/>
                <div style={{marginTop: "20px"}}>
                    <a href={genDictionaryUrl(activeKey)} target="_blank" rel="noreferrer">Oxford dictionary</a>
                </div>
                <Form id="quiz-form" action="" onSubmit={onClick} className="margin-top_30">
                    <h2 className="h3 mb-3 fw-normal no-select">{getQuestion(activeKey, quiz?.type!)} {translation}</h2>
                    <div className="form-floating flex-center flex-column">
                        <input
                            id="input-question"
                            ref={ref}
                            className="form-control centralize-text"
                            aria-describedby="allOption"
                            defaultValue=""
                            type="text"
                            onClick={() => scrollTo('#root')}
                            required
                            autoFocus
                            autoComplete="off"
                            spellCheck="false"
                            autoCorrect="off"
                            style={{width: "70%"}}
                        />
                        {small}
                    </div>
                    <div className="start-btn-div">
                        <Button id="submit" type="submit" className="start-btn">
                            {quiz!.active === quiz!.count! - 1 ? "Finish" : "Confirm"}
                        </Button>
                    </div>
                </Form>
            </main>
        </div>
    );
};

export default Quiz;
