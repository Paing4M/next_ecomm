import type {LucideIcon} from "lucide-react";

interface CardProps {
  title: string;
  icon: LucideIcon;
  number: number | string;
}


const Card = ({title, icon: Icon, number}: CardProps) => {
  return (
    <div
      className='p-4 rounded-lg bg-white shadow w-full min-w-[200px] min-h-[100px] flex items-center justify-center'>
      <div className='flex items-center gap-2 w-full justify-between'>
        <div>
          <h4 className='text-gray-500 mb-2 capitalize'>{title}</h4>
          <h1 className='text-2xl font-semibold mt-2'>{number}</h1>
        </div>

        <Icon className='w-10 h-10'/>
      </div>
    </div>
  )
}
export default Card
