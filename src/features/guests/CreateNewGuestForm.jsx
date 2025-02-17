import { useForm } from "react-hook-form";
import countries from "../../data/data-countries";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { useGuestContext } from "../../context/GuestContext";
import { useBookingFormContext } from "../../context/BookingFormContext";

function CreateNewGuestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { closeCreateGuestForm, setCurrGuest } = useGuestContext();
  const { openBookingForm } = useBookingFormContext();

  function onSubmit(data) {
    const countryFlag = JSON.parse(data.nationality).countryFlag;
    const nationality = JSON.parse(data.nationality).nationality;

    data = { ...data, countryFlag, nationality: nationality };

    setCurrGuest(data);

    openBookingForm();
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Heading>Create new guest</Heading>
      <FormRow label="Guest name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="text"
          id="email"
          {...register("email", {
            required: "This field is required.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address.",
            },
          })}
        />
      </FormRow>
      <FormRow label="National Id" error={errors?.nationalID?.message}>
        <Input
          type="text"
          id="nationalID"
          {...register("nationalID", {
            required: "This field is required",
            minLength: 13,
            maxLength: 13,
          })}
        />
      </FormRow>
      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Select
          selectType="nationality"
          options={countries}
          id="nationality"
          {...register("nationality", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow>
        <Button $variation="secondary" onClick={() => closeCreateGuestForm()}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </FormRow>
    </Form>
  );
}

export default CreateNewGuestForm;
