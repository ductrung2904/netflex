import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper'

import { Item } from '../../pages/utils/types'
import MovieCard from './MovieCard'
import type { NextPage } from 'next'

interface MovieSliderProps {
  data: Item[]
  loop?: boolean
}

const MovieSlider: NextPage<MovieSliderProps> = ({ data, loop = true }) => {
  return (
    <Swiper
      className="!w-[calc(100vw-16px)] !px-2 md:!px-14"
      modules={[Navigation, Autoplay]}
      spaceBetween={30}
      autoplay={{ delay: 5000, disableOnInteraction: true }}
      slidesPerView="auto"
      loop={loop}
      slidesPerGroupAuto
      // navigation
    >
      <div className="!flex">
        {data.map((item) => (
          <SwiperSlide key={item.id} className="!flex !w-[200px]">
            <MovieCard item={item} width={200} height={300} />
          </SwiperSlide>
        ))}
      </div>
    </Swiper>
  )
}

export default MovieSlider
