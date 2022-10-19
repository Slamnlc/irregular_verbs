import {QuizData, QuizType, UserAnswer} from "./types";
import {irregular} from "./data";

export function makeId(length: number = 10) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export function getRandomSequence(obj: object, count: number) {
    const arr = {};
    const keys = Object.keys(obj);
    while (Object.keys(arr).length < count) {
        const keyIndex = Math.floor(Math.random() * keys.length) + 1;
        if (Object.keys(arr).indexOf(keys[keyIndex]) === -1) {
            // @ts-ignore
            arr[keys[keyIndex]] = obj[keys[keyIndex]]
        }
    }
    return arr
}


export function getQuiz(): QuizData | null {
    let quiz: any = localStorage.getItem('data')
    if (quiz) {
        quiz = JSON.parse(quiz) as QuizData
    }
    return quiz
}


export function verifyAnswer(answer: string | string[], question: keyof typeof irregular, type: QuizType): boolean {
    const correct = getCorrectAnswer(question, type)
    switch (type) {
        case "first-second":
        case "first-third":
        case "second-third":
        case "third-second":
        case "translation":
            // @ts-ignore
            return correct.includes(answer.toString())
        case "all":
            return correct[0].includes(answer[0]) && correct[1].includes(answer[1])
        case "third-first":
        case "second-first":
            return answer === correct
    }
}

export function getCorrectAnswer(question: keyof typeof irregular, type: QuizType): string[] | string | string[][] {
    const key = irregular[question];
    switch (type) {
        case "first-second":
            return key.second
        case "first-third":
            return key.third
        case "second-third":
            return key.third
        case "third-second":
            return key.second
        case "translation":
            return prepareAnswer(key.translation)
        case "all":
            return [key.second, key.third]
        case "third-first":
        case "second-first":
            return question.toString()
    }

}

export function prepareAnswer(answer: string[]): string[] {
    return answer.map(el => el.replace(/(\s*\(.*\))/, ''))
}

export function getQuestion(key: keyof typeof irregular, type: QuizType) {
    switch (type) {
        case "translation":
        case "first-third":
        case "first-second":
            return key
        case "second-first":
        case "second-third":
            return irregular[key].second
        case "third-first":
        case "third-second":
            return irregular[key].third
        case "all":
            return [irregular[key].second, irregular[key].third]
    }
}

export function getCircleColor(answers: UserAnswer[], index: number): "grey" | "green" | "red" {
    if (index > answers.length - 1) {
        return "grey"
    }
    if (answers[index].result) {
        return "green"
    }
    return "red"
}

export function splitArray(arr: any[], chunkSize: number) {
    const result = []
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize))
    }
    return result
}


export function isMobile(): boolean {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
}
