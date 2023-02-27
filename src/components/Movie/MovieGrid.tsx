import type { NextPage } from 'next'
import { Item } from '../../pages/utils/types'
import Pagination from '../Display/Pagination'
import MovieCard from './MovieCard'

interface MovieGridProps {
  data: Item[]
  currentPage: number
  maximumPage: number
  resolveLink: (page: number) => string
}

const MovieGrid: NextPage<MovieGridProps> = ({
  data,
  currentPage,
  maximumPage,
  resolveLink,
}) => {
  return (
    <>
      <div
        className="grid justify-center gap-5"
        style={{
          gridGap: 20,
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        }}
      >
        {data.map((item) => (
          <MovieCard item={item} key={item.id} width={160} height={270} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        {maximumPage > 1 && (
          <Pagination
            current={currentPage}
            maximum={maximumPage}
            resolveLink={resolveLink}
          />
        )}
      </div>
    </>
  )
}

export default MovieGrid
