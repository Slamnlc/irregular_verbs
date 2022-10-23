import {irregular} from "./data";
import React from "react";
import {QuizClass} from "./quizClass";

export type QuizType = "translation" | "first-second" | "first-third" | "second-first" | "second-third" | "third-first"
    | "third-second" | "all"

export interface QuizData {
    id?: string
    count?: number
    type?: QuizType
    questions?: { [key: keyof typeof irregular]: irregularLine }
    answers?: UserAnswer[]
    active?: number
    translation?: boolean
    minDifficult?: DifficultLevels
    maxDifficult?: DifficultLevels
}

export interface QuizProps {
    quiz?: QuizClass | null
    updateQuiz?: (key: keyof QuizData, value: any) => void
    createNewQuiz?: (type: QuizType, count: number, addTranslation: boolean, minDifficult: DifficultLevels,
                     maxDifficult: DifficultLevels) => void
    validateUserAnswer?: (userAnswer: string) => void
}

export interface irregularLine {
    second: string[]
    third: string[]
    translation: string[],
    level: DifficultLevels
}

export interface UserAnswer {
    answer: string
    result: boolean
    correct: string | string[] | string[][]
}

export interface LogoProps {
    width: number
    height: number
    onClick?: (event: React.MouseEvent) => void
    fill?: string
}

export enum DifficultLevels {
    Elementary,
    PreIntermediate,
    Intermediate,
    UpperIntermediate,
    OldFashion
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


export const difficultLevels = {
    0: "Elementary",
    1: "Pre Intermediate",
    2: "Intermediate",
    3: "Upper Intermediate",
    4: "Old fashion / Formal"
}
