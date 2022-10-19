import {irregular} from "./data";

export type QuizType = "translation" | "first-second" | "first-third" | "second-first" | "second-third" | "third-first"
    | "third-second" | "all"

export interface QuizData {
    id?: string
    count?: number
    type?: QuizType
    questions?: { [key: keyof typeof irregular]: irregularLine }
    answers?: UserAnswer[]
    correctCount?: number
    failCount?: number
    active?: number
}

export interface QuizProps {
    quiz?: QuizData
    updateQuiz?: (key: keyof QuizData, value: any) => void
    createNewQuiz?: (type: QuizType, count: number) => void
}

export interface irregularLine {
    second: string[]
    third: string[]
    translation: string[]
}

export interface UserAnswer {
    answer: string
    result: boolean
    correct: string | string[] | string[][]
}

export const quizTypeData = {
    "first-second": "Infinitive to Past Simple (II)",
    "first-third": "Infinitive to Past Participle (III)",
    "second-first": "Past Simple (II) to Infinitive",
    "second-third": "Past Simple (II) to Past Participle (III)",
    "third-first": "Past Participle (III) to Participle",
    "third-second": "Past Participle (III) to Infinitive",
    "all": "Infinitive to Past Simple (II) + Past Participle (III)",
    "translation": "Translation"
}
