import React, {FC} from 'react';
import {irregular} from "../Utils/data";
import {QuizType} from "../Utils/types";

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
