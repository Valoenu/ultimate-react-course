import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext(); // Create Authorization Context

const initialState = { //user will be null at the beginning without login
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) { // There are only two actions
    case "login": // Login action
      return { ...state, user: action.payload, isAuthenticated: true }; // user will be assignment with user payload and set isAuthenticated to True.
    case "logout": // Logout action
      return { ...state, user: null, isAuthenticated: false }; //user when he will logout he will be back to null and set isAuthenticated to falls
    default: // If error 
      throw new Error("Unknown action");
  }
}

// Never do this becouse everyone will get access to users data

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) { // Will receive the children, new context ~ the same receipe,
  const [{ user, isAuthenticated }, dispatch] = useReducer( // dispatch 
    reducer,
    initialState
  );

// We cant use dispatch becouse we will do something with Login

  function login(email, password) { // Function that will need email and password
    if (email === FAKE_USER.email && password === FAKE_USER.password) // Check if the user data is correct with the login
      dispatch({ type: "login", payload: FAKE_USER }); // Then assign/dispatch action of login with the payload with the fake user
  }

  function logout() { // doesn't need any information
    dispatch({ type: "logout" }); // dispatch logout event
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() { // function hook, biolerplate,
  const context = useContext(AuthContext);
  if (context === undefined) // check if the value is undefined, if it is then throw new error
    throw new Error("AuthContext was used outside AuthProvider");
  return context; // otherwise just return context
}

export { AuthProvider, useAuth }; // export 
