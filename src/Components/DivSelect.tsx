import React, {FC, Ref} from 'react';

interface DivSelectProps {
    id: string
    label: string
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
    optionObject: object
    defaultSelect?: string | number
    refer: Ref<HTMLSelectElement>
}

const DivSelect: FC<DivSelectProps> = (
    {
        id,
        label,
        onChange,
        optionObject,
        defaultSelect,
        refer
    }) => {
    return (
        <div className="form-group margin-top_15">
            <label htmlFor={id}>{label}</label>
            <select className="form-control centralize-text" id={id} defaultValue={defaultSelect}
                    ref={refer} required onChange={onChange}>
                {Object.entries(optionObject).map(([key, value]) => {
                    return <option value={key} key={key}>{value}</option>
                })}
            </select>
        </div>
    );
};

export default DivSelect;
