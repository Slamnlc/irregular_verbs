import {difficultLevels, QuizType, UserAnswer} from "./types";
import {irregular} from "./data";
import {QuizClass} from "./quizClass";

export function makeId(length: number = 10): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export function getRandomSequence(obj: object, count: number, minDifficult: number, maxDifficult: number) {
    const arr = {};
    const keys = Object.keys(obj);
    while (Object.keys(arr).length < count) {
        const keyIndex = Math.floor(Math.random() * keys.length) + 1;
        // @ts-ignore
        if (Object.keys(arr).indexOf(keys[keyIndex]) === -1) {
            try {
                // @ts-ignore
                if (obj[keys[keyIndex]].level <= maxDifficult && obj[keys[keyIndex]].level >= minDifficult) {
                    // @ts-ignore
                    arr[keys[keyIndex]] = obj[keys[keyIndex]]
                }
            } catch {

            }
        }
    }
    return arr
}


export function getQuiz(): QuizClass | null {
    let quiz: any = localStorage.getItem('data')
    if (quiz) {
        quiz = new QuizClass(JSON.parse(quiz))
    }
    return quiz
}

export function convertCorrectToString(correct: string[] | string | string[][], type: QuizType): string {
    switch (type) {
        case "first-second":
        case "first-third":
        case "second-third":
        case "third-second":
            // @ts-ignore
            return correct.join(', ')
        case "third-first":
        case "second-first":
            return correct.toString()
        case "all":
            // @ts-ignore
            return `${correct[0].join(', ')}, ${correct[0].join(',')}`
        case "translation":
            // @ts-ignore
            return correct.join(', ')
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
        case "all":
            return key
        case "second-first":
        case "second-third":
            return irregular[key].second.join(', ')
        case "third-first":
        case "third-second":
            return irregular[key].third.join(', ')
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


export function openInNewTab(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

export function scrollTo(querySelector: string) {
    document.querySelector(querySelector)!.scrollIntoView({
        behavior: "smooth"
    })
}

export function genDictionaryUrl(text: string): string {
    return `https://www.oxfordlearnersdictionaries.com/definition/english/${text}_1?q=${text}`
}

export function filterDifficult(minDifficult: string) {
    return Object.keys(difficultLevels).filter(el => +el >= +minDifficult).reduce(function (obj, x) {
        // @ts-ignore
        obj[x] = difficultLevels[x]
        return obj;
    }, {})
}
