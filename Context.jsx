import { createContext, useState } from "react";

// User Context
export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Filters Context
export const FiltersContext = createContext({});

export const FiltersProvider = ({ children }) => {
  // Directly set the initial state based on screen width
  const [filters, setFilters] = useState(window.matchMedia("(min-width: 980px)").matches);

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};