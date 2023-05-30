'use client';
import {createContext, useState, SetStateAction} from 'react';
type ContextProps = {
    selectedFunction: any;
    setSelectedFunction: React.Dispatch<SetStateAction<any>>;
    rootFindingMethod:any;
    setRootFindingMethod:React.Dispatch<SetStateAction<any>>;
};
export const SelectedContext = createContext<ContextProps>({
    selectedFunction: undefined,
    setSelectedFunction: () => undefined,
    rootFindingMethod:undefined,
    setRootFindingMethod:() => undefined});
    
export default function SelectedContextProvider({ children }:any) {
    const [selectedFunction, setSelectedFunction] = useState();
    const [rootFindingMethod, setRootFindingMethod] = useState();
   
    return (<SelectedContext.Provider value={{selectedFunction, setSelectedFunction, rootFindingMethod, setRootFindingMethod}}>
            {children}
        </SelectedContext.Provider>);
}
  