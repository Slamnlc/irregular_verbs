import React, {FC} from 'react';
import {irregular} from "../data";
import {QuizType} from "../types";

interface QuestionCardProps {
    question: keyof typeof irregular
    type: QuizType
}

const QuestionCard: FC<QuestionCardProps> = ({question, type}) => {
    return (
        <div>
            
        </div>
    );
};

export default QuestionCard;
