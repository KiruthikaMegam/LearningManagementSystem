
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const initialUsers = [
  {
    id: 1,
    name: "QSpiders Admin",
    email: "admin@qspiders.com",
    password: "Admin@123",
    role: "admin"
  },
  {
    id: 2,
    name: "Alex Morgan",
    email: "student@gmail.com",
    password: "123456",
    role: "student"
  }
];

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("qspiders_users");

    let userList = savedUsers
      ? JSON.parse(savedUsers)
      : [];

    initialUsers.forEach((demoUser) => {
      const exists = userList.some(
        (user) => user.email.toLowerCase() === demoUser.email.toLowerCase()
      );

      if (!exists) {
        userList.push(demoUser);
      }
    });

    localStorage.setItem(
      "qspiders_users",
      JSON.stringify(userList)
    );

    return userList;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("qspiders_currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function updateUsers(updatedUsers) {
    setUsers(updatedUsers);

    localStorage.setItem(
      "qspiders_users",
      JSON.stringify(updatedUsers)
    );

    if (currentUser) {
      const updatedCurrentUser = updatedUsers.find(
        (user) => user.id === currentUser.id
      );

      if (updatedCurrentUser) {
        setCurrentUser(updatedCurrentUser);

        localStorage.setItem(
          "qspiders_currentUser",
          JSON.stringify(updatedCurrentUser)
        );
      }
    }
  }

  function signup(userData) {
    const exists = users.some(
      (user) =>
        user.email.toLowerCase() === userData.email.toLowerCase()
    );

    if (exists) {
      return {
        success: false,
        message: "This email is already registered."
      };
    }

    const newUser = {
      id: Date.now(),
      ...userData,
      role: "student"
    };

    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);

    localStorage.setItem(
      "qspiders_users",
      JSON.stringify(updatedUsers)
    );

    return {
      success: true,
      user: newUser
    };
  }

  function login(email, password) {
    const user = users.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password
    );

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password"
      };
    }

    setCurrentUser(user);

    localStorage.setItem(
      "qspiders_currentUser",
      JSON.stringify(user)
    );

    return {
      success: true,
      user
    };
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem("qspiders_currentUser");
  }

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        signup,
        login,
        logout,
        updateUsers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
