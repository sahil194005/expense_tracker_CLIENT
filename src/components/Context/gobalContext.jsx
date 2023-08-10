import React, { useRef } from 'react'


export const GlobalContext = React.createContext();


export const GlobalContextProvider = (props) => {
    const amountRef = useRef(null);
    const descriptionRef = useRef(null);
    const categoryRef = useRef(null);
  
    let initVal = {
        amountRef,
        descriptionRef,
        categoryRef
    }

    return (
        <GlobalContext.Provider value={initVal} >
            {props.children}
        </GlobalContext.Provider>
    )
}