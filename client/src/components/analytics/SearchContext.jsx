import React, { createContext, useContext, useState } from "react";

export var searchContext  = createContext();
export default function SearchProvider ( {children} ){
    const [input , setInput] = useState("")
    const[output , setOutput] = useState(null)
    return (
        <searchContext.Provider value={{input , setInput , output , setOutput}} >
            {children}
        </searchContext.Provider>
    )
}