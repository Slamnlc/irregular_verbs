import React, {createRef, FC, useState} from 'react';
import {Button} from "react-bootstrap";
import "../gen.css"
import {DifficultLevels, difficultLevels, QuizProps, QuizType, quizTypeData} from "../Utils/types";
import {useNavigate} from "react-router-dom";
import DivSelect from "../Components/DivSelect";
import DivInput from "../Components/DivInput";
import CustomForm from "../Components/CustomForm";
import DivCheckbox from "../Components/DivCheckbox";
import {filterDifficult} from "../Utils/utils";

const QuizParams: FC<QuizProps> = ({createNewQuiz}) => {

    const wordNumber = createRef<HTMLInputElement>();
    const quizType = createRef<HTMLSelectElement>();
    const addTranslation = createRef<HTMLInputElement>();
    const minDifficultLevel = createRef<HTMLSelectElement>();
    const maxDifficultLevel = createRef<HTMLSelectElement>();
    const navigate = useNavigate();
    const [translation, setTranslation] = useState<boolean>(false);
    const [minDifficult, setMinDifficult] = useState<string>("2")

    const changeMinDifficult = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMinDifficult(event.target.value)
    }

    const onClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const questionCount = +wordNumber.current?.value!
        const minDifficult: DifficultLevels = +minDifficultLevel.current?.value!
        const maxDifficult: DifficultLevels = +maxDifficultLevel.current?.value!
        createNewQuiz!(quizType.current?.value as QuizType, questionCount, addTranslation.current?.checked!,
            minDifficult, maxDifficult)
        navigate('/quiz')
    }
    const onChange = () => {
        setTranslation(quizType.current?.value === 'translation')
    }

    return (
        <CustomForm id="quiz-params-form" onSubmit={onClick} title="Parametrize your quiz!">
            <DivInput
                ref={wordNumber}
                id="questionsCount"
                description="Insert number of words in quiz. Maximum is 20"
                wrapExtraClass="margin-top_30"
                label="Number of questions"
                placeholder="Insert number of words in quiz. Maximum is 20"
                defaultValue={10}
                type="number" max={20} min={1}
                required
            />
            <div className="difficult-div">
                <DivSelect id="minDifficultLevel" label="Minimum difficult type"
                           optionObject={difficultLevels} refer={minDifficultLevel}
                           onChange={changeMinDifficult}/>
                <DivSelect id="maxDifficultLevel" label="Maximum difficult type"
                           optionObject={filterDifficult(minDifficult)} refer={maxDifficultLevel}/>
            </div>
            <DivSelect id="quizType" label="Select quiz type"
                       onChange={onChange} optionObject={quizTypeData}
                       refer={quizType}/>
            {translation
                ? <></>
                : <DivCheckbox id="addTranslation" label="Add translation" ref={addTranslation}/>}
            <div className="start-btn-div">
                <Button id="submit" type="submit" className="start-btn">Start!</Button>
            </div>
        </CustomForm>
    );
};

export default QuizParams;
