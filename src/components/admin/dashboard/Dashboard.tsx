import Card from "@/components/admin/dashboard/Card";
import {BadgeDollarSignIcon, PackageIcon, Users} from "lucide-react";
import Chart from "@/components/admin/dashboard/Chart";
import {dashboardData} from "@/lib/actions/dashboardAction";

const Dashboard = async () => {
  const res = await dashboardData()

  if (!res.success) return null


  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Card title={'total user'} icon={Users} number={res.data.userCount.toLocaleString()}/>
        <Card title={'total order'} icon={PackageIcon} number={res.data.orderCount.toLocaleString()}/>
        <Card title={'total sale'} icon={BadgeDollarSignIcon} number={'$ ' + res.data.totalSale.toLocaleString()}/>
      </div>

      <div className='mt-6'>
        <Chart data={res.data.saleData}/>
      </div>
    </div>
  )
}
export default Dashboard
