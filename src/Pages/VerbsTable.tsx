import React, {createRef, useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {irregular} from "../Utils/data";
import {genDictionaryUrl, openInNewTab, scrollTo} from "../Utils/utils";
import {difficultLevels} from "../Utils/types";
import BoxArrowUpIcon from "../Icons/BoxArrowUpIcon";

const VerbsTable = () => {
    const table = createRef<HTMLTableElement>();
    const [activeUp, setActiveUp] = useState(false)

    const handleScroll = () => {
        if (table && table.current!) {
            setActiveUp(window.scrollY > table.current!.getBoundingClientRect().y * 2)
        }

    }

    const scrollTop = () => {
        scrollTo('#root')
    }

    useEffect(() => {
        // @ts-ignore
        window.addEventListener('scroll', handleScroll)
        return () => {
            // @ts-ignore
            window.removeEventListener('scroll', handleScroll)
        }
    })

    return (
        <div className="table-div">
            <div className={activeUp ? "up-btn active" : "up-btn"} onClick={scrollTop}>Up</div>
            <Table striped bordered hover ref={table}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Infinitive</th>
                    <th>Past Simple</th>
                    <th>Past Participle</th>
                    <th className="mobile-hide">Level</th>
                    <th>Переклад</th>
                    <th className="mobile-hide">Oxford link</th>
                </tr>
                </thead>
                <tbody>
                {
                    Object.entries(irregular).map(([key, value], index) => {
                        return <tr key={`${key}-${index}`}>
                            <td>{index + 1}</td>
                            <td>{key}</td>
                            <td>{value.second.join(', ')}</td>
                            <td>{value.third.join(', ')}</td>
                            <td className="mobile-hide">{difficultLevels[value.level]}</td>
                            <td>{value.translation.join(', ')}</td>
                            <td className="pointer mobile-hide" onClick={() => {openInNewTab(genDictionaryUrl(key))}}>
                                <BoxArrowUpIcon height={24} width={24} fill="blue"/>
                            </td>
                        </tr>
                    })
                }
                </tbody>
            </Table>
        </div>
    );
};

export default VerbsTable;
