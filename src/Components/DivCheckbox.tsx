import React, {ForwardRefRenderFunction, InputHTMLAttributes} from 'react';

interface DivCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string
    label: string
}

const DivCheckbox: ForwardRefRenderFunction<HTMLInputElement, DivCheckboxProps> = (
    {
        id,
        label,
        ...props
    }, ref) => {
    return (
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id={id} ref={ref}/>
            <label className="form-check-label" htmlFor={id}>
                {label}
            </label>
        </div>
    );
};

export default React.forwardRef(DivCheckbox);
