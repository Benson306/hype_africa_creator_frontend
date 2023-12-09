import { useContext } from "react";

export const RightSidebarContext = useContext();

export const RightSidebarProvider = ({ children }) => {

    
    return (
        <RightSidebarContext.Provider value={{}}>
            { children }
        </RightSidebarContext.Provider>
    )
}