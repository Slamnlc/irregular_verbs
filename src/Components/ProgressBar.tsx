import React, {FC, Fragment} from 'react';
import {getCircleColor, isMobile, splitArray} from "../utils";
import {QuizData} from "../types";

interface ProgressBarProps {
    quiz: QuizData
}

const ProgressBar: FC<ProgressBarProps> = ({quiz}) => {
    const chunk = isMobile() ? 5: 10
    const arr = splitArray(Object.keys(quiz.questions!), chunk);
    let glIndex = 0

    return (
        <div className="circle-div-wrap">
            {arr.map((chunk) => {
                return <div className="circle-div" key={`${glIndex}-circle-div`}>
                    {chunk.map((el, index) => {
                            const color = getCircleColor(quiz.answers!, glIndex)
                            const circleClass = glIndex === quiz.active! - 1 ? `circle ${color} active` : `circle ${color}`
                            glIndex++
                            return <Fragment key={`${glIndex}-fragment`}>
                                {index !== 0 ? <div className="sep-line"></div> : <></>}
                                <span className={circleClass}></span>
                            </Fragment>
                        }
                    )}
                </div>
            })
            }
        </div>
    );
};

export default ProgressBar;
