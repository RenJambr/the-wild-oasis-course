import { createContext, useContext, useState } from "react";

const GuestContext = createContext();

// Guest context with functions for open and close form, check if form is open and set current guest
function GuestProvider({ children }) {
  const [isOpenCreateGuestForm, setIsOpenCreateGuestForm] = useState(false);
  const [currGuest, setCurrGuest] = useState(null);

  const openCreateGuestForm = () => setIsOpenCreateGuestForm(true);
  const closeCreateGuestForm = () => setIsOpenCreateGuestForm(false);

  return (
    <GuestContext.Provider
      value={{
        isOpenCreateGuestForm,
        openCreateGuestForm,
        closeCreateGuestForm,
        currGuest,
        setCurrGuest,
      }}
    >
      {children}
    </GuestContext.Provider>
  );
}

function useGuestContext() {
  const context = useContext(GuestContext);
  if (context === undefined)
    throw new Error("GuestContext was used outside of GuestProvider.");

  return context;
}

export { GuestProvider, useGuestContext };
