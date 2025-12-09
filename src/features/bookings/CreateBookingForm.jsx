import ChooseGuestFromBase from "../guests/ChooseGuestFromBase";
import CreateNewGuestForm from "../guests/CreateNewGuestForm";
import { useGuestContext } from "../../context/GuestContext";
import { useBookingFormContext } from "../../context/BookingFormContext";
import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import Heading from "../../ui/Heading";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useCabins } from "../cabins/useCabins";
import Spinner from "../../ui/Spinner";
import ErrorFallback from "../../ui/ErrorFallback";
import Select from "../../ui/Select";
import { useEffect } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { getToday, subtractDates } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";
import Checkbox from "../../ui/Checkbox";
import Textarea from "../../ui/Textarea";
import { useCreateGuest } from "../guests/useCreateGuest";
import { useCreateBooking } from "./useCreateBooking";
import FormRowFlex from "../../ui/FormRowFlex";

function CreateBookingForm({ onCloseModal }) {
  // Get guest info
  const { isOpenCreateGuestForm, currGuest, setCurrGuest } = useGuestContext();
  // Get booking info
  const {
    isOpenBookingForm,
    closeBookingForm,
    selectedCabin,
    setSelectedCabin,
  } = useBookingFormContext();
  // Fetch cabins
  const {
    cabins,
    isLoading: isLoadingCabins,
    error: cabinsError,
  } = useCabins();
  const { createGuest, isCreating: isCreatingGuest } = useCreateGuest();
  const { createBooking, isCreating: isCreatingBooking } = useCreateBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    trigger,
    reset,
  } = useForm();

  // Effect for setting default value of first selected cabin
  useEffect(() => {
    if (cabins) {
      setSelectedCabin(cabins[0]);
    }
  }, [cabins, setSelectedCabin]);

  useEffect(() => {
    if (selectedCabin) {
      // Set the cabin price when the selected cabin is available on initial load
      updatePrices("cabin&total");
    }
  }, [selectedCabin]);

  if (
    isLoadingCabins ||
    isLoadingSettings ||
    isCreatingGuest ||
    isCreatingBooking
  )
    return <Spinner />;
  if (cabinsError) return <ErrorFallback error={cabinsError} />;

  function onCloseBookingForm() {
    setCurrGuest(null);
    reset();
    closeBookingForm();
  }

  function onChangeCabin(e) {
    const value = parseInt(e.target.value);
    const selectedCabin = cabins.find((cabin) => cabin.id === value);
    const { numNights } = getValues();

    if (!selectedCabin) return;

    setSelectedCabin(selectedCabin);
    numNights && updatePrices("cabin&total");
  }

  function onChangeNumGuests(e) {
    setValue("numGuests", parseInt(e.target.value), { shouldValidate: true });

    updatePrices();
  }

  function updateNumNights() {
    const { startDate, endDate } = getValues();
    if (startDate && endDate) {
      setValue("numNights", subtractDates(endDate, startDate), {
        shouldValidate: true,
      });

      updatePrices();
    }
  }

  function updatePrices(type = "all") {
    const { numNights, numGuests, hasBreakfast } = getValues();

    const cabinPrice =
      selectedCabin.discount > 0
        ? (selectedCabin.regularPrice - selectedCabin.discount) * numNights
        : numNights * selectedCabin.regularPrice;

    const extrasPriceValue =
      numNights && numGuests && hasBreakfast
        ? numGuests * numNights * settings.breakfastPrice
        : 0;

    const totalPrice =
      numNights && extrasPriceValue === 0
        ? cabinPrice
        : cabinPrice + extrasPriceValue;

    const setCabinPrice = () =>
      setValue("cabinPrice", cabinPrice, {
        shouldValidate: true,
      });
    const setExtrasPrice = () => {
      if (!hasBreakfast || numGuests === 0) return setValue("extrasPrice", 0);
      setValue("extrasPrice", extrasPriceValue, {
        shouldValidate: true,
      });
    };
    const setTotalPrice = () => {
      if (!numNights) return setValue("totalPrice", 0);
      setValue("totalPrice", totalPrice, {
        shouldValidate: true,
      });
    };

    if (type === "cabinPrice") return setCabinPrice();
    if (type === "extrasPrice") return setExtrasPrice();
    if (type === "totalPrice") return setTotalPrice();
    if (type === "cabin&total") {
      setCabinPrice();
      setTotalPrice();
      return;
    }
    if (type === "all") {
      setCabinPrice();
      setExtrasPrice();
      setTotalPrice();
      return;
    }
  }

  function onChangeStartDate(_, dateString) {
    setValue("startDate", dateString, { shouldValidate: true });
    trigger(["startDate", "endDate"]);
    updateNumNights();
  }
  function onChangeEndDate(_, dateString) {
    setValue("endDate", dateString, { shouldValidate: true });
    trigger(["startDate", "endDate"]);
    updateNumNights();
  }

  function onChangeBreakfastIncluded(e) {
    setValue("hasBreakfast", e.target.checked);

    updatePrices();
  }

  function onSubmit(data) {
    function handleBooking(guest) {
      const bookingData = {
        guestId: Array.isArray(guest) ? guest[0]?.id : guest?.id,
        ...data,
        status: "unconfirmed",
      };

      createBooking(bookingData, {
        onSuccess: () => {
          onCloseBookingForm();
          onCloseModal?.();
        },
      });
    }
    if (!currGuest.hasOwnProperty("id")) {
      createGuest(currGuest, {
        onSuccess: (data) => {
          setCurrGuest(data);
          handleBooking(data);
        },
      });
    } else {
      handleBooking(currGuest);
    }
  }
  function onError(error) {
    console.log(error);
  }

  return !isOpenBookingForm ? (
    isOpenCreateGuestForm ? (
      <CreateNewGuestForm />
    ) : (
      <ChooseGuestFromBase />
    )
  ) : (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Heading>Create new booking</Heading>
      <FormRow label="Guest name">
        <Input type="text" disabled value={currGuest.fullName} />
      </FormRow>
      <FormRow label="Cabin ID">
        <Select
          {...register("cabinId", { required: "This field is required." })}
          onChange={onChangeCabin}
          error={errors?.cabinId?.message}
          options={cabins?.map((cabin) => ({
            value: cabin.id,
            label: cabin.name,
          }))}
          id="cabinId"
        />
      </FormRow>
      <FormRowFlex>
        <FormRow label="Start date" error={errors?.startDate?.message}>
          <DatePicker
            {...register("startDate", { required: "This field is required." })}
            name="startDate"
            onChange={onChangeStartDate}
            style={{ width: `max-content` }}
            minDate={dayjs(getToday(), "YYYY-MM-DD")}
          />
        </FormRow>
        <FormRow label="End date" error={errors?.endDate?.message}>
          <DatePicker
            {...register("endDate", {
              required: "This field is required.",
              validate: (value) => {
                const startDate = getValues().startDate;

                if (value < startDate)
                  return "Start date cannot be higher than end date.";

                if (value === startDate) return "Dates cannot be the same.";
              },
            })}
            name="endDate"
            onChange={onChangeEndDate}
            style={{ width: `max-content` }}
            disabledDate={(current) => {
              return (
                current &&
                current.isBefore(
                  dayjs(getValues().startDate).add(1, "day"),
                  "day"
                )
              );
            }}
          />
        </FormRow>
      </FormRowFlex>
      <FormRow label="Number of nights" error={errors?.numNights?.message}>
        <Input
          {...register("numNights", {
            min: {
              value: settings.minBookingLength,
              message: `Minimum nights per booking is ${settings.minBookingLength}`,
            },
            max: {
              value: settings.maxBookingLength,
              message: `Maximum nights per booking is ${settings.maxBookingLength}`,
            },
          })}
          type="number"
          disabled
          id="numNights"
        />
      </FormRow>
      <FormRow label="Number of guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          {...register("numGuests", {
            valueAsNumber: true,
            required: "This filed is required.",
            min: { value: 1, message: "Number of guests should be at least 1" },
            max: {
              value: settings.maxGuestsPerBooking,
              message: `Max number of guests per booking is ${settings.maxGuestsPerBooking}`,
            },
          })}
          onChange={onChangeNumGuests}
          id="numGuests"
        />
      </FormRow>
      <FormRow label="Observations">
        <Textarea {...register("observations")} defaultValue={""} />
      </FormRow>
      <FormRowFlex>
        <FormRow label="Breakfast included">
          <Checkbox
            {...register("hasBreakfast")}
            id="hasBreakfast"
            onChange={onChangeBreakfastIncluded}
          />
        </FormRow>

        <FormRow label="Is paid">
          <Checkbox
            {...register("isPaid")}
            id="isPaid"
            onChange={(e) => setValue("isPaid", e.target.checked)}
          />
        </FormRow>
      </FormRowFlex>
      <FormRow
        label={`Cabin price ${
          selectedCabin.discount > 0
            ? `- discount per night $${selectedCabin.discount} ${
                getValues().numNights > 0
                  ? `($${
                      getValues().numNights > 0
                        ? selectedCabin.discount * getValues().numNights
                        : ""
                    })`
                  : ""
              }`
            : ``
        }`}
      >
        <Input
          {...register("cabinPrice")}
          defaultValue={selectedCabin.regularPrice}
          type="number"
          disabled
          id="cabinPrice"
        />
      </FormRow>
      <FormRow label="Extras price">
        <Input
          {...register("extrasPrice")}
          type="number"
          disabled
          defaultValue={0}
        />
      </FormRow>
      <FormRow label="Total price">
        <Input
          type="number"
          disabled
          {...register("totalPrice", { valueAsNumber: true })}
          defaultValue={0}
        />
      </FormRow>
      <FormRow>
        <Button $variation="secondary" onClick={() => onCloseBookingForm()}>
          Back
        </Button>
        <Button type="submit">Submit</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
