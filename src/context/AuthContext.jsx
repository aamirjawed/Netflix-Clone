import { useContext, useEffect, useState } from "react"
import { createContext } from "react"

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"

import {auth, db} from '../services/firebase.js'
import {doc, setDoc} from 'firebase/firestore'


const AuthContext = createContext()
export function AuthContextProvider({ children }) {

    const [user, setUser] = useState({})

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        });

        return () => {
            unsubscribe()
        }
    }, [])

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentail) => {
            return setDoc(doc(db, 'users', email),{
                favShows:[]
            })
        })
        
    }
    function logIn(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut(){
        return signOut(auth)
    }

    return (
        <AuthContext.Provider value={{user, signUp, logIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext)
}