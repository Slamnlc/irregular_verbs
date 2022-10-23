import {DifficultLevels, irregularLine, QuizData, QuizType, UserAnswer} from "./types";
import {getRandomSequence, makeId, prepareAnswer} from "./utils";
import {irregular} from "./data";

export class QuizClass implements QuizData {
    id: string
    count: number
    type: QuizType
    questions: { [key: keyof typeof irregular]: irregularLine }
    answers: UserAnswer[]
    active: number
    translation: boolean
    minDifficult: DifficultLevels
    maxDifficult: DifficultLevels
    keys: string[]

    constructor(data: QuizData) {
        this.id = data.id!
        this.count = data.count!
        this.type = data.type!
        this.questions = data.questions!
        this.answers = data.answers!
        this.active = data.active!
        this.translation = data.translation!
        this.minDifficult = data.minDifficult!
        this.maxDifficult = data.maxDifficult!
        this.keys = Object.keys(this.questions!)

    }

    activeQuestion(): keyof typeof irregular {
        return this.keys[this.active! - 1];
    }

    updateQuiz(key: keyof QuizData, value: any) {
        (this as any)[key] = value;
        localStorage.setItem('data', JSON.stringify(this))
        return new QuizClass(this)
    }

    getCorrectAnswer(question: keyof typeof irregular): string[] | string | string[][] {
        const key = irregular[question];
        switch (this.type) {
            case "first-second":
            case "third-second":
                return key.second
            case "first-third":
            case "second-third":
                return key.third
            case "translation":
                return prepareAnswer(key.translation)
            case "all":
                return [key.second, key.third]
            case "third-first":
            case "second-first":
                return question.toString()
        }
    }

    verifyAnswer(answer: string | string[], question: keyof typeof irregular): boolean {
        const correct = this.getCorrectAnswer(question);
        switch (this.type) {
            case "first-second":
            case "first-third":
            case "second-third":
            case "third-second":
            case "translation":
                // @ts-ignore
                return correct.includes(answer.toString())
            case "all":
                const result = answer.toString().toLowerCase().split(',')
                if (result.length !== 2) {
                    return false
                }
                return correct[0].includes(result[0].replaceAll(' ', '')) &&
                    correct[1].includes(result[1].replaceAll(' ', ''))
            case "third-first":
            case "second-first":
                return answer === correct
        }
    }

    validateUserAnswer(userAnswer: string, toast: any): QuizClass {
        const isCorrect = this.verifyAnswer(userAnswer.toLowerCase(), this.activeQuestion());
        const correctAnswer = this.getCorrectAnswer(this.activeQuestion());

        if (!isCorrect) {
            this.showError(correctAnswer, toast)
        }
        this.answers.push({
            answer: userAnswer,
            result: isCorrect,
            correct: correctAnswer
        })
        this.active++
        localStorage.setItem('data', JSON.stringify(this))
        return new QuizClass(this)
    }

    showError(content: any, toast: any) {
        switch (typeof content) {
            case "string":
                toast.error(content);
                break
            case "object":
                if (typeof content[0] === "string") {
                    toast.error(content.join(', '))
                } else {
                    toast.error(content[0].join(', '))
                    // @ts-ignore
                    toast.error(content[1].join(', '))
                }
                break
        }
    }

    static createNewQuiz(type: QuizType, count: number,
                         addTranslation: boolean, minDifficult: DifficultLevels, maxDifficult: DifficultLevels) {
        const quiz: QuizData = {
            id: makeId(),
            type: type,
            count: count,
            questions: getRandomSequence(irregular, count, minDifficult, maxDifficult),
            active: 1,
            translation: addTranslation,
            answers: [],
            minDifficult: minDifficult,
            maxDifficult: maxDifficult
        }
        localStorage.setItem('data', JSON.stringify(quiz))
        return new QuizClass(quiz)
    }
}
