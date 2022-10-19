import React, {createRef, FC, useEffect} from 'react';
import {QuizProps, quizTypeData} from "../types";
import {useNavigate} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {getCorrectAnswer, getQuestion, verifyAnswer} from "../utils";
import ProgressBar from "./ProgressBar";
import {toast} from "react-toastify";


const Quiz: FC<QuizProps> = ({quiz, updateQuiz}) => {
    const navigate = useNavigate();
    const ref = createRef<HTMLInputElement>();

    const keys = (Object.keys(quiz!).length !== 0) ? Object.keys(quiz!.questions!) : []
    const activeKey = keys[quiz!.active! - 1];

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
        // <div className="question-card-wrap">
            <main className="question-card">
                <h3 className="margin-bottom-30">{quizTypeData[quiz?.type!]}</h3>
                <ProgressBar quiz={quiz!}/>
                <Form id="login-form" action="" onSubmit={onClick} className="margin-top_30">
                    <h2 className="h3 mb-3 fw-normal">{getQuestion(activeKey, quiz?.type!)}</h2>
                    <div className="form-floating">
                        <input
                            id="input-question"
                            ref={ref}
                            className="form-control centralize-text"
                            defaultValue=""
                            type="text"
                            required
                            autoFocus
                            autoComplete="off"
                            spellCheck="false"
                            autoCorrect="off"
                        />
                    </div>
                    <div className="start-btn-div">
                        <Button id="submit" type="submit" className="start-btn">
                            {quiz!.active === quiz!.count! - 1 ? "Finish" : "Confirm"}
                        </Button>
                    </div>
                </Form>
            </main>
        // </div>
    );
};

export default Quiz;
