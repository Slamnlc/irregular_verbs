import React, {FC, Ref} from 'react';

interface DivSelectProps {
    id: string
    label: string
    onChange?: () => void
    optionObject: object
    refer: Ref<HTMLSelectElement>
}

const DivSelect: FC<DivSelectProps> = (
    {
        id,
        label,
        onChange,
        optionObject,
        refer
    }) => {
    return (
        <div className="form-group margin-top_15">
            <label htmlFor={id}>{label}</label>
            <select className="form-control centralize-text" id={id}
                    ref={refer} required onChange={onChange}>
                {Object.entries(optionObject).map(([key, value]) => {
                    return <option value={key} key={key}>{value}</option>
                })}
            </select>
        </div>
    );
};

export default DivSelect;
