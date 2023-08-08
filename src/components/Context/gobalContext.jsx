import React, { useState } from 'react'


export const GlobalContext = React.createContext();


export const GlobalContextProvider = (props) => {
    const [profileComplete, setProfileComplete] = useState(false);
    const profileHandler = () => {
        setProfileComplete(true);
    }
    let initVal = {
        profileComplete,
        profileHandler
    }

    return (
        <GlobalContext.Provider value={initVal} >
            {props.children}
        </GlobalContext.Provider>
    )
}