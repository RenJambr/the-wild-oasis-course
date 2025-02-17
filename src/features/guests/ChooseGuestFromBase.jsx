import { Select } from "antd";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import { useGuests } from "./useGuests";
import { useGuestContext } from "../../context/GuestContext";
import { Flag } from "../../ui/Flag";
import { useBookingFormContext } from "../../context/BookingFormContext";

const StyledPreBookingForm = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: start;
  flex-direction: column;
  max-width: 500px;
  gap: 2rem;
`;

const GuestInfo = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: start;
  flex-direction: column;
  gap: 1rem;
`;

const StyledNationality = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 0.5rem;
`;

function ChooseGuestFromBase() {
  const { guests, isLoading } = useGuests();
  const { openCreateGuestForm, currGuest, setCurrGuest } = useGuestContext();
  const { openBookingForm } = useBookingFormContext();

  function onChangeGuest(value) {
    const selectedGuest = guests.filter((guest) => guest.id === value)[0];
    setCurrGuest(selectedGuest);
  }

  function createNewGuest() {
    openCreateGuestForm();
    setCurrGuest(null);
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <StyledPreBookingForm>
        <Heading>Choose guest from the base</Heading>
        <FormRow>
          <FormRowVertical label="Guests name">
            {guests && (
              <Select
                onChange={onChangeGuest}
                showSearch
                style={{ width: `inherit` }}
                placeholder="Find a guest"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={guests?.map((guest) => ({
                  value: guest.id,
                  label: guest.fullName,
                }))}
              />
            )}
          </FormRowVertical>

          {currGuest && (
            <FormRow>
              <GuestInfo>
                <p>Name: {currGuest?.fullName}</p>
                <StyledNationality>
                  Nationality: {currGuest?.nationality}{" "}
                  <Flag src={currGuest?.countryFlag} alt="Flag" />
                </StyledNationality>
                <p>National ID: {currGuest?.nationalID}</p>
                <p>Email: {currGuest?.email}</p>
              </GuestInfo>
            </FormRow>
          )}
        </FormRow>
        <FormRow>
          <Button onClick={createNewGuest}>Create new guest</Button>
          {currGuest && <Button onClick={openBookingForm}>Next</Button>}
        </FormRow>
      </StyledPreBookingForm>
    </Form>
  );
}

export default ChooseGuestFromBase;
