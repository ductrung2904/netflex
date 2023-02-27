import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import MovieDetail from '../../../components/Movie/MovieDetail'
import { getMovieDetail } from '../../api/api'
import { Cast, Detail, Item, VideoTrailer } from '../../utils/types'

interface MovieProps {
  data: Detail
  casts: Cast[]
  similar: Item[]
  videos: VideoTrailer[]
}

const Movie: NextPage<MovieProps> = (props) => {
  return <MovieDetail {...props} media_type="movie" />
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const movieId = params?.id as string

  try {
    const response = await getMovieDetail(movieId)
    return {
      props: {
        ...response,
      },
      revalidate: 3600,
    }
  } catch (error) {
    return {
      notFound: true,
      revalidate: true,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export default Movie
