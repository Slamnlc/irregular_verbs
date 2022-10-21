import React, {FC} from 'react';
import {QuizType, UserAnswer} from "../types";
import TickIcon from "./TickIcon";
import CrossIcon from "./CrossIcon";
import {convertCorrectToString} from "../utils";

interface ResultProps {
    item: UserAnswer
    index: number
    type: QuizType
}

const Result: FC<ResultProps> = ({item, index, type}) => {
    const icon = item.result
        ? <TickIcon height={32} width={32} fill="green"/>
        : <CrossIcon height={48} width={48} fill="red"/>

    const content = item.result
        ? <span>{item.answer}</span>
        : <div>
            <div className="result-incorrect"><span>Your answer:</span>
                <span>{item.answer}</span></div>
            <div className="result-incorrect">
                <span>Correct answer:</span>
                <span>{convertCorrectToString(item.correct, type)}</span></div>
        </div>


    return (
        <div className="result">
            {icon}
            <span>{index}.</span>
            {content}
        </div>
    )
        ;
};

export default Result;
