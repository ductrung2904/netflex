import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { FaPlayCircle, FaTimes, FaYoutube } from 'react-icons/fa'
import { Cast, Detail, Item, VideoTrailer } from '../../pages/utils/types'
import StarRating from '../Display/StarRating'
import Button from '../Shared/Button'
import Meta from '../Shared/Meta'
import MovieSlider from './MovieSlider'

interface MovieDetailProps {
  data: Detail
  casts: Cast[]
  similar: Item[]
  videos: VideoTrailer[]
  media_type: 'movie' | 'tv'
}

const MovieDetail: NextPage<MovieDetailProps> = ({
  data,
  casts,
  similar,
  videos,
  media_type,
}) => {
  const [movieTrailerOpened, setMovieTrailerOpened] = useState(false)
  return (
    <>
      <Meta
        title={
          media_type === 'movie' ? data.title + ' - Movie' : data.name + ' - TV'
        }
        description="Viewing Info"
        image={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
      />
      <div className="relative min-h-screen">
        <div
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${data.backdrop_path}")`,
            backgroundPosition: '50%',
          }}
          className="mask-image absolute top-0 left-0 z-[-1] block h-[350px] w-screen bg-cover bg-no-repeat opacity-50 md:h-[500px]"
        ></div>
        <div className="flex flex-col gap-5 px-6 pt-24 md:flex-row md:px-20 md:pt-52">
          <div className="flex w-full flex-shrink-0 items-start justify-center md:w-[300px]">
            <Image
              className="rounded-xl"
              src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
              width={300}
              height={450}
              alt=""
            />
          </div>
          <div className="flex flex-col justify-start gap-3">
            <div className="flex flex-wrap justify-center gap-2 md:h-12 md:flex-nowrap md:justify-start">
              {media_type === 'movie' ? (
                <Link key={data.id} href={`/movie/${data.id}/watch`}>
                  <a>
                    <Button>
                      <FaPlayCircle />
                      <span>Watch Now</span>
                    </Button>
                  </a>
                </Link>
              ) : data.seasons.length > 0 &&
                data.seasons[0].episode_count > 0 ? (
                <Link key={data.id} href={`/tv/${data.id}/watch`}>
                  <a>
                    <Button>
                      <FaPlayCircle />
                      <span>Watch Now</span>
                    </Button>
                  </a>
                </Link>
              ) : (
                <></>
              )}
              {videos.length > 0 && (
                <Button onClick={() => setMovieTrailerOpened(true)}>
                  <FaYoutube />
                  <span>Watch Trailer</span>
                </Button>
              )}
            </div>
            <p className="text-4xl">
              {media_type === 'movie' ? data.title : data.name}
            </p>
            <p className="text-justify text-lg">{data.overview}</p>
            {data.release_date && <p>Release Date: {data.release_date}</p>}
            {data.last_air_date && (
              <p>Last Episode Date: {data.last_air_date}</p>
            )}
            {data.genres && (
              <div className="flex flex-wrap gap-2">
                {data.genres.map((item) => (
                  <span
                    key={item.id}
                    className="whitespace-nowrap rounded-full border border-white bg-dark-lighten px-3 py-1"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center">
              {data.vote_average ? (
                <StarRating
                  stars={Math.round(data.vote_average)}
                  maximum={10}
                  extraText={` (${data.vote_count} votes)`}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10 px-6 md:mt-20 md:px-20">
          {data.homepage && (
            <p className="text-xl" style={{ wordBreak: 'break-all' }}>
              Official website:{' '}
              <a
                href={data.homepage}
                className="text-orange"
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.homepage}
              </a>
            </p>
          )}
          {casts && (
            <>
              <h1 className="my-8 text-2xl">Casts</h1>
              <div
                className="grid gap-3"
                style={{
                  gridGap: 12,
                  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                }}
              >
                {casts.map((item) => (
                  <div key={item.id} className="flex flex-col items-center">
                    <Image
                      src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                      className="h-auto w-full rounded-xl object-cover"
                      width={168}
                      height={251}
                      alt=""
                    />
                    <p className="text-center">{item.name}</p>
                    <p className="text-center text-orange">{item.character}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        {similar && (
          <>
            <h1 className="my-10 px-6 text-2xl md:px-20">Similar Movies</h1>
            <MovieSlider data={similar} loop={false} />
          </>
        )}
      </div>
      {movieTrailerOpened && (
        <div
          className="fixed top-0 left-0 z-[60] flex h-screen w-screen items-center justify-center bg-[#2a2a2a80]"
          onClick={() => setMovieTrailerOpened(false)}
        >
          <div
            className="flex max-h-screen w-full max-w-xl flex-col items-start gap-3 overflow-y-auto rounded-lg bg-dark-lighten p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex w-full justify-between">
              <h1 className="ml-2 text-2xl">Movie Trailer</h1>
              <button
                className="cursor-pointer"
                onClick={() => setMovieTrailerOpened(false)}
              >
                <FaTimes size={30} />
              </button>
            </div>
            {videos.length > 0 &&
              videos.map((item) => (
                <Fragment key={item.key}>
                  <h1 className="mx-2 mt-4 text-lg">{item.name}</h1>
                  <div
                    className="relative h-0 w-full"
                    style={{ paddingBottom: '56.25%' }}
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${item.key}`}
                      frameBorder="0"
                      className="absolute top-0 left-0 h-full w-full"
                      title="Youtube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </Fragment>
              ))}
          </div>
        </div>
      )}
    </>
  )
}

export default MovieDetail
