import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabins }) {
  //1
  const numBookings = bookings.length;

  //2
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //3
  const checkins = confirmedStays.length;

  //4
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabins.length);

  return (
    <>
      <Stat
        value={numBookings}
        color="blue"
        title="Bookings"
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        value={formatCurrency(sales)}
        color="green"
        title="Sales"
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        value={checkins}
        color="indigo"
        title="Checkins"
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        value={Math.round(occupation * 100) + "%"}
        color="yellow"
        title="Occupancy rate"
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
