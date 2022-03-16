import React, { useContext, useState } from "react";

const ThemeContext = React.createContext();
// const ThemeUpdateContext = React.createContext();

export function useTheme() {
    return useContext(ThemeContext);
}

export function ContextProvider({ children }) {
    const [createType, setCreateType] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // function increment() {
    //     setCounter((prevCounter) => prevCounter++);
    // }

    return (
        <ThemeContext.Provider
            value={{
                createType: createType,
                setCreateType: setCreateType,
                isCreating: isCreating,
                setIsCreating: setIsCreating,
                isEditing: isEditing,
                setIsEditing: setIsEditing,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}
