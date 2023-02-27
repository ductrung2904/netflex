import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { FaInfoCircle, FaPlayCircle } from 'react-icons/fa'
import { Item } from '../../pages/utils/types'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../Shared/Button'
import { AnimatePresence, motion } from 'framer-motion'
import MovieSlider from '../Movie/MovieSlider'
import { SwiperProps } from 'swiper/react'

// https://image.tmdb.org/t/p/original/${main?.backdrop_path}

interface BannerProps {
  main: Item
  data: Item[]
}

const Banner: NextPage<BannerProps> = ({ main, data }) => {
  const bannerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const transition = [0.33, 1, 0.68, 1]
  const [index, setIndex] = useState<number>(0)

  // ----------Error----------------
  // const activeSlide = useMemo(() => data[index], [data, index])
  // const handleSlideChange: SwiperProps['onSlideChange'] = useCallback(
  //   (swiper) => {
  //     swiper.loopCreate
  //     setIndex(swiper.realIndex)
  //   },
  //   []
  // )

  return (
    <Fragment>
      <div className="relative z-0 hidden h-[450px] w-screen justify-between gap-6 object-contain px-10 text-white md:flex md:px-20">
        <AnimatePresence>
          <motion.div
            variants={bannerVariants}
            animate="animate"
            exit="exit"
            initial="initial"
            className="h-0 w-full"
            key={main.title}
          >
            <Image
              src={`https://image.tmdb.org/t/p/original/${main?.backdrop_path}`}
              className="absolute top-0 left-0 hidden h-screen w-screen object-cover opacity-[0.5] md:block"
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition="50% 35%"
            />
            <div className="absolute z-10 flex h-[190px] w-auto flex-1">
              <motion.div
                className="flex flex-col items-start gap-4 pt-[100px]"
                animate="animate"
                initial="initial"
                transition={{ ease: transition, duration: 1 }}
                key={main.title}
              >
                <h1 className="pb-5 text-5xl font-bold">
                  {main?.title || main?.name}
                </h1>
                <p className="max-w-xl text-justify text-lg text-gray-100 md:text-xl">
                  {main.overview}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/movie/${main.id}/watch`}>
                    <a>
                      <Button>
                        <FaPlayCircle />
                        <span>Watch Now</span>
                      </Button>
                    </a>
                  </Link>
                  <Link href={`/movie/${main.id}`}>
                    <a>
                      <Button>
                        <FaInfoCircle />
                        <span>View Info</span>
                      </Button>
                    </a>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="banner__overlay--down absolute left-0 bottom-0 h-16 w-full"></div>
      </div>
      {data && (
        <div className="w-full px-4 pb-12 md:px-2">
          {/* <MovieSlider data={data} onSlideChange={handleSlideChange} /> */}
          <MovieSlider data={data} loop={false} />
        </div>
      )}
    </Fragment>
  )
}

export default Banner
