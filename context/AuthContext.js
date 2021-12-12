import React, { createContext, useReducer, useCallback } from "react";
import app from "../helper/firebaseInit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
const initialState = { user: "I am a user", error: null };

export const AuthContext = createContext(initialState);
const auth = getAuth(app);
const authReducer = (state, action) => {
  switch (action.type) {
    case "sign_in":
      return { ...state, user: action.payload.user, error: null };
    // case "sign_up":
    //   return { ...state, user: action.payload.user, error: null };
    case "sign_out":
      return { ...state, user: null };
    case "add_error":
      return { ...state, error: action.payload.error };

    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  async function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log("User signed up", user);
        dispatch({ type: "sign_in", payload: { user } });
      })
      .catch((error) => {
        dispatch({ type: "add_error", payload: { error: error.message } });
        throw error;
      });
  }

  async function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log("User signed in", user);
        dispatch({ type: "sign_in", payload: { user } });

        // ...
      })
      .catch((error) => {
        console.log("User clicked sign in", error);
        //setError("There was an error. Couldn't create the account");
        dispatch({ type: "add_error", payload: { error: error.message } });
        throw error;
      });
  }

  const loadCurrentUser = useCallback(async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        dispatch({ type: "sign_in", payload: { user } });
      } else {
        // User is signed out
        dispatch({ type: "sign_out" });
      }
    });
  }, []);

  const addError = (message) => {
    dispatch({ type: "add_error", payload: { error: message } });
  };

  const signOutUser = async () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "sign_out" });
      })
      .catch((error) => {
        console.log("error signOut", error.message);
      });
  };

  const confirmUser = async (email, code) => {
    // try {
    //   console.log(`email: ${email} code ${code}`);
    //   await Auth.confirmSignUp(email, code);
    // } catch (error) {
    //   // dispatch({ type: "add_error", payload: { error: error.message } });
    //   console.log("error confirmUser", error.message);
    //   throw error;
    // }
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        signUp,
        signIn,
        addError,
        signOutUser,
        confirmUser,
        loadCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
