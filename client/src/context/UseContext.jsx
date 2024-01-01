// UserContext.js
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    currentUser: null,
    error: null,
    loading: false,
  });

  const signIn = async (userData) => {
    try {
      setState({ ...state, loading: true });
      // Logic to sign in the user, e.g., API call
      // Assume you get the user data as a response
      const user = await signInApiCall(userData);
      setState({ currentUser: user, loading: false, error: null });
    } catch (error) {
      setState({ ...state, error: error, loading: false });
    }
  };

  // Similarly, you can create updateUser, deleteUser, signOut methods

  return (
    <UserContext.Provider value={{ state, signIn /*, other methods */ }}>
      {children}
    </UserContext.Provider>
  );
};
