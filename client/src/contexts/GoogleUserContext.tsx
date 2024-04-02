import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import LoginPage from '../pages/LoginPage/LoginPage';

export type GoogleUserType = {
    name: string
    avatar_url: string
    email: string
}

export interface GoogleUserContextInterface {
    googleUser: GoogleUserType,
    setGoogleUser: Dispatch<SetStateAction<GoogleUserType>>
}
const defaultUserState = {
    googleUser: {
        name: '',
        avatar_url: '',
        email: ''
    },
    setGoogleUser: (googleUser: GoogleUserType) => {

    }
} as GoogleUserContextInterface

export const GoogleUserContext = createContext(defaultUserState)

type GoogleUserProviderProps = {
    children: ReactNode
}

export default function GoogleUserProvider({children} : GoogleUserProviderProps){
    const [googleUser, setGoogleUser] = useState<GoogleUserType>({
        name: '',
        email: '',
        avatar_url:''
    }
    )

    return (
        <GoogleUserContext.Provider value={{googleUser, setGoogleUser}}>
            {children}
        </GoogleUserContext.Provider>
    )
}