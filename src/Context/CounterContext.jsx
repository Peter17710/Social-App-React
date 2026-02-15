import { createContext, useState } from "react";


export let CounterContext = createContext();

export function CounterContextProvider({children}){

    const [ counter, setCounter ] = useState(50);


    return (
                <CounterContext.Provider value={{counter , setCounter}}>
                    {children}

                </CounterContext.Provider>
    );
}


export default CounterContextProvider; 