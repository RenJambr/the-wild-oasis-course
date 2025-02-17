import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBooking as createBookingApi } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createBooking, isLoading: isCreating } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      toast.success("Booking was successfully created.");
      queryClient.invalidateQueries(["bookings"]);
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createBooking, isCreating };
}
