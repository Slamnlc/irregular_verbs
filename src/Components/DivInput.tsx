import React, {ForwardRefRenderFunction, InputHTMLAttributes} from 'react';

interface DivInputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string
    description?: string
    wrapExtraClass?: string
    label?: string
}

const DivInput: ForwardRefRenderFunction<HTMLInputElement, DivInputProps> = (
    {
        id,
        description,
        wrapExtraClass,
        label,
        ...props
    }, ref) => {

    const wrapClassName = wrapExtraClass ? `form-floating ${wrapExtraClass}` : 'form-floating'
    const descriptionId = `${id}-description`

    return (
        <div className={wrapClassName}>
            {label ? <label htmlFor={id}>{label}</label> : <></>}
            <input
                {...props}
                id={id}
                ref={ref}
                className="form-control centralize-text"
                aria-describedby={descriptionId}
            />
            {description
                ? <small id={descriptionId} className="form-text text-muted">
                    {description}
                </small>
                : <></>}
        </div>
    );
};

export default React.forwardRef(DivInput);
