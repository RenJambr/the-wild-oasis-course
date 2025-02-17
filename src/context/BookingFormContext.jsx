import { createContext, useContext, useState } from "react";

const BookingFormContext = createContext();

function BookingFormProvider({ children }) {
  const [isOpenBookingForm, setIsOpenBookingForm] = useState(false);
  const [selectedCabin, setSelectedCabin] = useState(null);

  const openBookingForm = () => setIsOpenBookingForm(true);
  const closeBookingForm = () => setIsOpenBookingForm(false);
  return (
    <BookingFormContext.Provider
      value={{
        isOpenBookingForm,
        openBookingForm,
        closeBookingForm,
        selectedCabin,
        setSelectedCabin,
      }}
    >
      {children}
    </BookingFormContext.Provider>
  );
}

function useBookingFormContext() {
  const context = useContext(BookingFormContext);

  if (context === undefined)
    throw new Error(
      "BookingFormContext was used outside of BookingFormProvider."
    );

  return context;
}

export { BookingFormProvider, useBookingFormContext };
