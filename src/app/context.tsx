'use client';
import {createContext, useState} from 'react';

export const SelectedContext = createContext({});

export default function SelectedContextProvider({ children }:any) {
    const [selectedFunction, setSelectedFunction] = useState();
    const [rootFindingMethod, setRootFindingMethod] = useState();
    return (<SelectedContext.Provider value={{selectedFunction, setSelectedFunction, rootFindingMethod, setRootFindingMethod}}>
            {children}
        </SelectedContext.Provider>);
}
  