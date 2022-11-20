

/***********************  We can delete this file after working with REDUX ************************ */

import { createContext, useEffect, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils.jsx";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";
//as the actual value you want to access
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state, action) => {
  const { type, payload } = action;
  //based on type we set  the payload which is the value
  //that we will set it to to our currentUser
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload }; // ...state --> spread the same values on the previous state object // and then override the current user with new value  --> payload
    default: //if none of these cases match the type value that i got then run the dfault
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE); // useReducer hook take  2 arguments state and the dipatch action

  const { currentUser } = state; //destructuring

  const setCurrentUser = (user) =>
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)); // the dispatch function that will update the Currentuser

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

/*                      The thing about reducers is that these reducers change the object that we get back and the properties and the values inside them based on the action.

               reduce replace usestate             

const userReducer =(sate ,action)=>
{
  return {
currentUser : null or {...}
  }
  
}

*/
