import React, {useState} from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'react-toastify/dist/ReactToastify.css';
import {Route, Routes} from "react-router-dom";
import MainPage from "./Components/MainPage";
import Service from "./Components/Service";
import Quiz from "./Components/Quiz";
import {DifficultLevels, QuizData, QuizType} from "./types";
import {getQuiz, getRandomSequence, makeId} from "./utils";
import {irregular} from "./data";
import ResultPage from "./Components/ResultPage";
import VerbsTable from "./Components/VerbsTable";


function App() {
    const oldQuiz = getQuiz()
    const data = (oldQuiz) ? oldQuiz : {}
    const [quiz, setQuiz] = useState<QuizData>(data)

    const updateQuiz = (key: keyof QuizData, value: any) => {
        const updQuiz = quiz
        updQuiz[key] = value
        localStorage.setItem('data', JSON.stringify(updQuiz))
        setQuiz((prevState) => ({...prevState, [key]: value}))
    }

    const createNewQuiz = (type: QuizType, count: number,
                           addTranslation: boolean, difficultLevel: DifficultLevels) => {
        const newQuiz: QuizData = {
            id: makeId(),
            type: type,
            count: count,
            questions: getRandomSequence(irregular, count, difficultLevel),
            active: 1,
            translation: addTranslation,
            answers: [],
            difficultLevel: difficultLevel
        }
        setQuiz(newQuiz)
        localStorage.setItem('data', JSON.stringify(newQuiz))
    }

    return (
        <Routes>
            <Route path="/" element={<Service/>}>
                <Route path="/" element={<MainPage createNewQuiz={createNewQuiz}/>}/>
                <Route path="/quiz" element={<Quiz quiz={quiz} updateQuiz={updateQuiz}/>}/>
                <Route path="/result" element={<ResultPage/>}/>
                <Route path="/table" element={<VerbsTable/>}/>
            </Route>
        </Routes>
    );
}

export default App;
