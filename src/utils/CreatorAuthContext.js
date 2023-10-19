import { createContext, useEffect, useState } from "react";

export const CreatorAuthContext = createContext();

export const CreatorAuthProvider = ({ children }) => {
    const [creatorId, setCreatorId]  = useState(null);

    const addCreatorId = (creatorId) => {
        setCreatorId(creatorId);

        localStorage.setItem('creator_id', creatorId);
    }

    const logoutCreator = () => {
        setCreatorId(null);
        localStorage.removeItem('creator_id');
    }

    const isCreatorIdSet = async () => {
        try {

            let creatorId = localStorage.getItem('creator_id');

            if(creatorId){
                setCreatorId(creatorId);
            }
            
        } catch (error) {
            console.log('Error Setting Creator Id');
        }
    }

    useEffect(()=>{
        isCreatorIdSet();
    },[])

    return (
        <CreatorAuthContext.Provider value={{ creatorId, addCreatorId, logoutCreator}}>
            { children }
        </CreatorAuthContext.Provider>
    )
}