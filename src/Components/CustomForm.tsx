import React, {FC, ReactNode} from 'react';
import {Form} from "react-bootstrap";

interface CustomFormProps {
    id: string
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    title?: string
    children: ReactNode

}

const CustomForm: FC<CustomFormProps> = ({id, onSubmit, title, children}) => {
    return (
        <div className="flex">
            <main className="quiz-params">
                <Form id={id} action="src/Pages/QuizParams" onSubmit={onSubmit}>
                    {title ? <h1 className="h3 mb-3 fw-normal">{title}</h1> : <></>}
                    {children}
                </Form>
            </main>
        </div>

    );
};

export default CustomForm;
