import DashboardHomeTable from "../../../Components/DashboardHomeTable";
import { useGetTotalUsersQuery } from "../../../redux/features/auth/authApi";
import { useGetTotalEarningsQuery } from "../../../redux/features/transaction/transactionApi";
import BarChartComponent from "./BarChart";
import TransactionAreaChart from "./TransactionAreaChart";


const DashboardHome = () => {
  const { data: totalEarnings } = useGetTotalEarningsQuery()
  const { data: totalUsers } = useGetTotalUsersQuery()

  return (
    <div className="space-y-[24px]">
      <div className="flex items-center gap-10">





      </div>

    </div>
  );
};

export default DashboardHome;
