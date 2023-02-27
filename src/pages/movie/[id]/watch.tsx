import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { relative } from 'path'
import StarRating from '../../../components/Display/StarRating'
import Meta from '../../../components/Shared/Meta'
import { getWatchMovieContent } from '../../api/api'
import { embedMovie } from '../../utils/constants'
import { Detail, Item } from '../../utils/types'

interface WatchMovieProps {
  data: Detail
  similar: Item[]
}

const WatchMovie: NextPage<WatchMovieProps> = ({ data, similar }) => {
  return (
    <>
      <Meta
        title={`${data.title} - Watch Episode - Netflex`}
        description="Watch the movie"
        image={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
      />
      <div className="mt-28 flex flex-col gap-8 px-5 lg:flex-row lg:px-20">
        <div className="flex-grow">
          <div
            className="relative h-0 w-full"
            style={{ paddingBottom: '56.25%' }}
          >
            <iframe
              className="absolute top-0 left-0 h-full w-full"
              src={embedMovie(data.id)}
              frameBorder="0"
              title=""
              allowFullScreen
            ></iframe>
          </div>
          <div className="my-10 flex flex-col items-start gap-4">
            <Link href={`/movie/${data.id}`}>
              <a className="text-2xl transition hover:text-orange">
                {data.title}
              </a>
            </Link>
            <p>{data.overview}</p>
            <p>Release date: {data.release_date}</p>
            <StarRating
              maximum={10}
              stars={Math.round(data.vote_average)}
              extraText={`(${data.vote_count} votes)`}
            />
          </div>
        </div>
        <div className="flex w-full flex-shrink-0 flex-col gap-4 overflow-y-auto lg:max-h-screen lg:w-80">
          <h1 className="text-xl">Similar Movies</h1>
          {similar.map((item) => (
            <Link key={item.id} href={`/movie/${item.id}`}>
              <a>
                <div className="flex cursor-pointer gap-4 pr-5">
                  <img
                    className="h-[120px] w-[80px] object-cover transition duration-300 group-hover:brightness-75"
                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                    alt=""
                  />
                  <div className="ml-4 py-3 transition duration-300 group-hover:text-orange">
                    <h1>{item.title}</h1>
                    <StarRating
                      stars={Math.round(item.vote_average / 2)}
                      maximum={5}
                    />
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id as string
    const response = await getWatchMovieContent(id)

    return {
      props: {
        ...response,
      },
      revalidate: 3600,
    }
  } catch (error) {
    console.log(error)
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

export default WatchMovie
