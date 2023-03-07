import type { NextPage } from 'next'
import Link from 'next/link'
import { Item } from '../../pages/utils/types'
import Image from 'next/image'
import { imageOriginal } from '../../pages/utils/constants'

interface MovieCardProps {
  item: Item
  width: number | string
  height: number | string
}

const MovieCard: NextPage<MovieCardProps> = ({ item, width, height }) => {
  return (
    <Link
      href={item.media_type === 'tv' ? `/tv/${item.id}` : `/movie/${item.id}`}
    >
      <a>
        <div className="group flex cursor-pointer flex-col items-center overflow-hidden rounded-lg">
          <Image
            src={`${imageOriginal(item.poster_path)}`}
            width={width}
            height={height}
            className="object-cover group-hover:brightness-75"
            alt={item.title || item.name}
            priority
          />
          <p className="h-[60px] w-full overflow-hidden bg-dark-darken p-2 transition duration-300 group-hover:text-red">
            {item.title || item.name}
          </p>
        </div>
      </a>
    </Link>
  )
}

export default MovieCard
