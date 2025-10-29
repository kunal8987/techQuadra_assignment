import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const UserContext = createContext();

export const useUsers = () => {
  // custom hook to consume the UserContext
  const context = useContext(UserContext); // get context value
  if (!context) {
    // if no context (hook used outside provider)
    throw new Error("useUsers must be used within a UserProvider"); // throw an error to enforce proper usage
  }
  return context; // return the context value (users, loading, addUser)
};

export const UserProvider = ({ children }) => {
  // provider component that wraps parts of the app
  const [users, setUsers] = useState([]); // state: list of users (initially empty)
  const [loading, setLoading] = useState(false); // state: loading flag (initially true)

  useEffect(() => {
    // effect to fetch users on mount
    const fetchUsers = async () => {
      // async function to fetch users
      setLoading(true);
      try {
        // try to fetch
        const response = await axios.get(
          // make GET request
          "https://jsonplaceholder.typicode.com/users"
        );
        // console.log(response);
        // store fetched users in state
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        // handle errors
        console.error("Error fetching users:", error);
      }
    };
    setLoading(false);
    fetchUsers();
  }, []);

  // function to add a new user to state
  const addUser = (newUser) => {
    // construct a new user object
    const user = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      address: {
        city: newUser.city,
        street: "",
        zipcode: "",
      },
      phone: "",
      website: "",
    };
    // append the new user immutably to users state
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  return (
    // render the provider
    <UserContext.Provider value={{ users, loading, addUser }}>
      {children}
    </UserContext.Provider>
  );
};
