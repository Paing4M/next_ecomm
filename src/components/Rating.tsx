import {StarHalfIcon, StarIcon} from "lucide-react";

interface RatingProps {
  value: number
}

const Rating = ({value}: RatingProps) => {

  const fullStars = Math.floor(value)
  const halfStars = value - fullStars > 0.5 ? 1 : 0
  const emptyStars = 5 - fullStars - halfStars

  const starWH = 'w-5 h-5'

  return (
    <div className='flex items-center gap-2 '>

      {[...Array(Number(fullStars) > 0 ? fullStars : 0)].map((_, i) => (
        <StarIcon className={starWH} stroke='#fde047' key={i} fill='#fde047'/>
      ))}

      {halfStars === 1 && <StarHalfIcon className={starWH} stroke='#fde047' fill='#fde047'/>}

      {[...Array(Number(emptyStars) > 0 ? emptyStars : 0)].map((_, i) => <StarIcon className={starWH} stroke='#fde047'
                                                                                   key={i}/>)}


    </div>
  )
}

export default Rating
