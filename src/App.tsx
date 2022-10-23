import React, {useState} from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'react-toastify/dist/ReactToastify.css';
import {Route, Routes} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import Service from "./Components/Service";
import Quiz from "./Pages/Quiz";
import {DifficultLevels, QuizData, QuizType} from "./Utils/types";
import {getQuiz} from "./Utils/utils";
import ResultPage from "./Pages/ResultPage";
import VerbsTable from "./Pages/VerbsTable";
import {QuizClass} from "./Utils/quizClass";
import {toast} from "react-toastify";


function App() {
    const oldQuiz = getQuiz()
    const data = (oldQuiz) ? oldQuiz : null
    const [quiz, setQuiz] = useState<QuizClass | null>(data)

    const updateQuiz = (key: keyof QuizData, value: any) => {
        setQuiz((quiz as QuizClass).updateQuiz(key, value))
    }

    const createNewQuiz = (type: QuizType, count: number,
                           addTranslation: boolean, minDifficult: DifficultLevels, maxDifficult: DifficultLevels) => {
        const newQuiz = QuizClass.createNewQuiz(type, count, addTranslation, minDifficult, maxDifficult)
        setQuiz(newQuiz)
    }

    const validateUserAnswer = (userAnswer: string) => {
        const newQuiz = quiz!.validateUserAnswer(userAnswer, toast)
        setQuiz(newQuiz)
    }


    return (
        <Routes>
            <Route path="/" element={<Service/>}>
                <Route path="/" element={<MainPage createNewQuiz={createNewQuiz}/>}/>
                <Route path="/quiz" element={<Quiz quiz={quiz} updateQuiz={updateQuiz}
                                                   validateUserAnswer={validateUserAnswer}/>}/>
                <Route path="/result" element={<ResultPage/>}/>
                <Route path="/table" element={<VerbsTable/>}/>
            </Route>
        </Routes>
    );
}

export default App;
