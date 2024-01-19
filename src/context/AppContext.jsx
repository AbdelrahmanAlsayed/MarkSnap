import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword,
    } from "firebase/auth";
import auth from "../../firebase.config";
import PropTypes from 'prop-types';


const AppContext = createContext();

function AppProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [markdown, setMarkdown] = useState(import.meta.env.VITE_REACT_APP_MARKDOWN_INITIAL);

    useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
    });

    // Cleanup function -  Unsubscribe from authentication state changes
    return () => {
        unsubscribe();
    };
}, []);


    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }; 
    
    const logOut = () => {
        return signOut(auth);
    }

    const reset = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const updateUserEmail = (email) => {
        return updateEmail(user, email);
    };

    const updateUserPassword = (password) => {
        return updatePassword(auth.currentUser, password);
    };

    
    const value = {
        user,
        signup,
        logIn,
        logOut,
        reset,
        updateUserEmail,
        updateUserPassword,
        markdown,
        setMarkdown,
    };


    return (
        <AppContext.Provider value={value}>
            {!loading && children}
        </AppContext.Provider>
    );
}

AppProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export function useAuth() {
    return useContext(AppContext);
}

export default AppProvider;


