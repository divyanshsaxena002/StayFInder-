import React, { createContext, useRef } from 'react';

export const SearchBarContext = createContext();

export const SearchBarProvider = ({ children }) => {
  const searchBarRef = useRef(null);

  const focusSearchBar = () => {
    if (searchBarRef.current) {
      searchBarRef.current.focus();
    }
  };

  return (
    <SearchBarContext.Provider value={{ searchBarRef, focusSearchBar }}>
      {children}
    </SearchBarContext.Provider>
  );
}; 