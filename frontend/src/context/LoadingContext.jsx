import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);

    const setLoading = (loading) => {
        setIsLoading(loading);
    }

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading }}>
            { children }
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);

    if(!context) {
        throw new Error("useLoading deve ser usado dentro de LoadingProvider");
    }

    return context;
}