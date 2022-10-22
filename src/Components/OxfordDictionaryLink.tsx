import React, {FC} from 'react';
import {genDictionaryUrl} from "../Utils/utils";

interface OxfordDictionaryLinkProps {
    infinitive: string
    wrapClass?: string
}

const OxfordDictionaryLink: FC<OxfordDictionaryLinkProps> = ({infinitive, wrapClass}) => {
    return (
        <div className={wrapClass}>
            <a href={genDictionaryUrl(infinitive)} target="_blank" rel="noreferrer">Oxford dictionary</a>
        </div>
    );
};

export default OxfordDictionaryLink;
