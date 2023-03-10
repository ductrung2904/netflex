import type { NextPage } from 'next'

interface RatingProps {
  stars: number
  maximum: number
  extraText?: string
}

const StarRating: NextPage<RatingProps> = ({
  stars = 0,
  maximum,
  extraText = '',
}) => {
  return (
    <div>
      {new Array(maximum).fill('').map((_, index) => (
        <span
          key={index}
          className={`text-xl ${
            index < stars ? 'text-orange' : 'text-gray-300'
          }`}
        >
          &#9733;
        </span>
      ))}
      <span>{extraText}</span>
    </div>
  )
}

export default StarRating
