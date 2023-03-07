import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import StarRating from '../../../components/Display/StarRating'
import Meta from '../../../components/Shared/Meta'
import { getTVSeasons } from '../../api/api'
import { embedEpisode, imageOriginal, imageResize } from '../../utils/constants'
import { Detail, Episode, Season } from '../../utils/types'

interface TVEpisodeProps {
  data: Detail
  seasons: Season[]
  seasonId: number
  episodeId: number
  episode: Episode
}

const TVEpisode: NextPage<TVEpisodeProps> = ({
  data,
  seasons,
  seasonId,
  episodeId,
  episode,
}) => {
  const [opened, setOpened] = useState<number | undefined>(Number(seasonId))

  return (
    <>
      <Meta
        title={`${data.name} - Episode ${episodeId} - Seasons ${seasonId} - Netflex`}
        description="Watch TV Episode"
        image={`${imageOriginal(episode.still_path)}`}
      />
      <div className="mt-28 flex flex-col gap-8 px-5 lg:flex-row lg:px-20">
        <div className="flex-grow">
          <div
            className="relative h-0 w-full"
            style={{ paddingBottom: '56.25%' }}
          >
            <iframe
              className="absolute top-0 left-0 h-full w-full"
              src={embedEpisode(data.id, seasonId, episodeId)}
              frameBorder="0"
              title="Youtube video player"
              allowFullScreen
            ></iframe>
          </div>
          <div className="my-10 flex flex-col items-start gap-2">
            <Link href={`/tv/${data.id}`}>
              <a className="text-2xl transition hover:text-orange">
                {data.name}
              </a>
            </Link>
            <h1 className="text-xl">{episode.name}</h1>
            <p>{episode.overview}</p>
            <p>Release Date: {episode.air_date}</p>
            <StarRating
              maximum={10}
              stars={Math.round(episode.vote_average)}
              extraText={`(${episode.vote_count} votes)`}
            />
          </div>
        </div>
        <div className="flex w-full flex-shrink-0 flex-col gap-2 lg:w-80">
          <h1 className="text-xl">Other episodes</h1>
          {seasons.map((item) => (
            <Fragment key={item.season_number}>
              <div
                className="mt-1 flex cursor-pointer gap-2 overflow-hidden rounded bg-dark-lighten transition duration-300 hover:brightness-90"
                onClick={() =>
                  opened === item.season_number
                    ? setOpened(undefined)
                    : setOpened(item.season_number)
                }
              >
                <div className="flex-shrink-0">
                  <Image
                    src={`${imageResize(item.poster_path)}`}
                    width={45}
                    height={68}
                    alt=""
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h1
                    className={`text-lg transition ${
                      opened === item.season_number ? 'text-orange' : ''
                    }`}
                  >
                    {item.name}
                  </h1>
                </div>
              </div>

              {opened === item.season_number && (
                <div className="flex flex-col gap-2">
                  {item.episodes.map((child) => (
                    <Link
                      key={child.episode_number}
                      href={{
                        pathname: `/tv/${data.id}/episode`,
                        query: {
                          season: item.season_number,
                          episode: child.episode_number,
                        },
                      }}
                    >
                      <a>
                        <div className="flex w-full cursor-pointer items-center overflow-hidden rounded-lg bg-dark-darken transition duration-300 hover:brightness-[80%]">
                          <Image
                            className="mr-4 flex-shrink-0 rounded-md object-cover"
                            src={`${imageResize(child.still_path)}`}
                            width={154}
                            height={87}
                            alt=""
                          />
                          <div className="ml-4 flex-grow">
                            <p
                              className={`${
                                child.episode_number === Number(episodeId)
                                  ? 'text-orange'
                                  : ''
                              }`}
                            >
                              Episode {child.episode_number}
                            </p>
                          </div>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  try {
    const id = params?.id as string

    const seasonId = query.season as string
    const episodeId = query.episode as string

    if (!seasonId || !episodeId) return { notFound: true }

    const response = (await getTVSeasons(id)) as {
      data: Detail
      seasons: Season[]
    }

    const episode = response.seasons
      .find((item) => item.season_number === Number(seasonId))
      ?.episodes.find((item) => item.episode_number === Number(episodeId))

    if (!episode) {
      return {
        notFound: true,
      }
    }

    return {
      props: { ...response, seasonId, episodeId, episode },
    }
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}

export default TVEpisode
