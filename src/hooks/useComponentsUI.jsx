import { useContext, createContext, useState } from "react";

const UIContext = createContext();

export const UIProvider = ({children}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <UIContext.Provider value={{
      isOpen,
      searchOpen,
      toggleMenu: () => setIsOpen(p => !p),
      toggleSearch: () => setSearchOpen(p => !p),
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext); 