"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

const ADMIN = {
  id: "admin-001",
  username: "admin",
  name: "FurniHouse Admin",
  email: "admin@furnihouse.com",
  password: "Admin@123",
  role: "admin",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("furnihouse-user");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      localStorage.removeItem("furnihouse-user");
    }

    setReady(true);
  }, []);

  function register(name, email, password) {
    try {
      const users = JSON.parse(
        localStorage.getItem("furnihouse-users") || "[]"
      );

      const normalizedEmail = email.trim().toLowerCase();

      if (normalizedEmail === ADMIN.email) {
        return {
          success: false,
          message: "This email is reserved.",
        };
      }

      if (users.some((item) => item.email === normalizedEmail)) {
        return {
          success: false,
          message: "Email already registered.",
        };
      }

      const newUser = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: normalizedEmail,
        password,
        role: "customer",
      };

      users.push(newUser);

      localStorage.setItem("furnihouse-users", JSON.stringify(users));

      const safeUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: "customer",
      };

      localStorage.setItem("furnihouse-user", JSON.stringify(safeUser));
      setUser(safeUser);

      return { success: true, role: "customer" };
    } catch {
      return {
        success: false,
        message: "Unable to create your account. Please try again.",
      };
    }
  }

  function login(identifier, password, expectedRole = "customer") {
    const normalizedIdentifier = identifier.trim().toLowerCase();

    // Fixed administrator account
    const isAdminIdentifier =
      normalizedIdentifier === ADMIN.username ||
      normalizedIdentifier === ADMIN.email;

    if (isAdminIdentifier && password === ADMIN.password) {
      if (expectedRole !== "admin") {
        return {
          success: false,
          message: "Please use the administrator login page.",
        };
      }

      const safeAdmin = {
        id: ADMIN.id,
        name: ADMIN.name,
        email: ADMIN.email,
        username: ADMIN.username,
        role: "admin",
      };

      localStorage.setItem("furnihouse-user", JSON.stringify(safeAdmin));
      setUser(safeAdmin);

      return { success: true, role: "admin" };
    }

    if (expectedRole === "admin") {
      return {
        success: false,
        message: "Incorrect administrator username or password.",
      };
    }

    try {
      const users = JSON.parse(
        localStorage.getItem("furnihouse-users") || "[]"
      );

      const foundUser = users.find(
        (item) =>
          item.email === normalizedIdentifier &&
          item.password === password &&
          item.role === "customer"
      );

      if (!foundUser) {
        return {
          success: false,
          message: "Incorrect email or password.",
        };
      }

      const safeUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: "customer",
      };

      localStorage.setItem("furnihouse-user", JSON.stringify(safeUser));
      setUser(safeUser);

      return { success: true, role: "customer" };
    } catch {
      return {
        success: false,
        message: "Unable to sign in. Please try again.",
      };
    }
  }

  function logout() {
    localStorage.removeItem("furnihouse-user");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, ready, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}