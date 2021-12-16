import { createContext, useReducer, useCallback, useEffect } from "react";
import app from "../helper/firebaseInit";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import nookies from "nookies";
import Cookies from "js-cookie";

const initialState = { user: null, error: null, routeUrl: null };

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
    case "add_route":
      return { ...state, routeUrl: action.payload.routeUrl };

    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log("onAuthStateChanged called");

      if (!user) {
        //nookies.destroy(undefined, "token");
        Cookies.remove("token", { path: "/" });
      } else {
        const token = await user.getIdToken();
        console.log("token", token);
        //nookies.set(undefined, "token", token, { path: "/" });
        Cookies.set("token", token, { path: "/" });
      }

      !!user
        ? dispatch({ type: "sign_in", payload: { user } })
        : dispatch({ type: "sign_out" });
    });
  }, []);

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
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("User signed in", user);
      dispatch({ type: "sign_in", payload: { user } });
    } catch (error) {
      console.log("User clicked sign in", error);

      //setError("There was an error. Couldn't create the account");
      dispatch({ type: "add_error", payload: { error: error.message } });
      throw error;
    }
  }

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in", user);
      dispatch({ type: "sign_in", payload: { user } });
    } catch (error) {
      console.log("User clicked sign in", error);
      console.log("Error Code", error.code);
      //setError("There was an error. Couldn't create the account");
      dispatch({ type: "add_error", payload: { error: error.message } });
      throw error;
    }
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

  const addRouteUrl = (url) => {
    dispatch({ type: "add_route", payload: { routeUrl: url } });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        signUp,
        signIn,
        signInWithGoogle,
        addError,
        signOutUser,
        confirmUser,
        loadCurrentUser,
        addRouteUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
