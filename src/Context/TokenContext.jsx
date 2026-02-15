import { createContext, useEffect, useState } from "react";

 

 export let TokenContext = createContext();

  function TokenContextProvider({children}){
    const [token, setToken] = useState(null);

    useEffect(() => {
      if(localStorage.getItem("userToken"))
        setToken(localStorage.getItem("userToken"));
    })
    
    return (
                <TokenContext.Provider value={{token , setToken}}>
                    {children} 
                </TokenContext.Provider>
    )
 }

 export default TokenContextProvider; 