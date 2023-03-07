import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import StarRating from '../../../components/Display/StarRating'
import Meta from '../../../components/Shared/Meta'
import { getTVSeasons } from '../../api/api'
import { imageOriginal, imageResize } from '../../utils/constants'
import { Detail, Season } from '../../utils/types'

interface WatchTVProps {
  data: Detail
  seasons: Season[]
}

const WatchTV: NextPage<WatchTVProps> = ({ data, seasons }) => {
  const [opened, setOpened] = useState<number | undefined>()

  return (
    <>
      <Meta
        title={`${data.name} - Seasons - Netflex`}
        description="View Seasons"
        image={`${imageOriginal(data.backdrop_path)}`}
      />

      <div className="flex justify-center">
        <div className="mx-6 mt-24 w-full max-w-4xl md:mx-20">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex flex-shrink-0 items-center justify-center md:w-[200px]">
              <Image
                src={`${imageResize(data.poster_path)}`}
                width={200}
                height={300}
                alt=""
              />
            </div>
            <div className="flex flex-grow flex-col items-start gap-3">
              <Link href={`/tv/${data.id}`}>
                <a>
                  <h1 className="cursor-pointer text-2xl transition hover:text-orange">
                    {data.name}
                  </h1>
                </a>
              </Link>
              <p className="text-justify">{data.overview}</p>
              <p className="text-gray-400">{data.last_air_date}</p>
              <StarRating
                stars={Math.round(data.vote_average)}
                maximum={10}
                extraText={`(${data.vote_count} votes)`}
              />
            </div>
          </div>
          <h1 className="mb-8 mt-12 text-2xl">Seasons</h1>
          {seasons.map((item) => (
            <Fragment key={item.season_number}>
              <div
                className="mt-4 flex cursor-pointer gap-4 overflow-hidden rounded-2xl bg-dark-lighten transition duration-300 hover:brightness-90"
                onClick={() =>
                  opened === item.season_number
                    ? setOpened(undefined)
                    : setOpened(item.season_number)
                }
              >
                <div className="h-[231px] w-[154px] flex-shrink-0">
                  <Image
                    className="h-full w-full"
                    src={`${imageResize(item.poster_path)}`}
                    width={154}
                    height={231}
                    alt=""
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h1
                    className={`text-3xl transition ${
                      opened === item.season_number ? 'text-orange' : ''
                    }`}
                  >
                    {item.name}
                  </h1>
                  <p className="text-xl text-gray-400">
                    {item.episodes.length} Episode
                    {item.episodes.length === 1 ? '' : 's'}
                  </p>
                </div>
              </div>

              {opened === item.season_number && (
                <div className="mt-4 flex flex-col gap-4 overflow-hidden">
                  {item.episodes.map((child, index) => (
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
                        <div
                          key={child.episode_number}
                          className="flex w-full cursor-pointer items-center overflow-hidden rounded-lg bg-dark-darken py-2 transition duration-300 hover:brightness-[80%]"
                        >
                          <div className="hidden w-10 flex-shrink-0 items-center justify-center md:flex">
                            <h1 className="text-center">{index + 1}</h1>
                          </div>
                          <Image
                            className="mr-4 flex-shrink-0 rounded-md object-cover"
                            src={`${imageResize(child.still_path)}`}
                            width={154}
                            height={87}
                            alt=""
                          />
                          <div className="ml-4 flex-1 flex-grow">
                            <h1 className="mr-4">{child.name}</h1>
                            <p className="text-gray-400">{child.air_date}</p>
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id as string

    const result = await getTVSeasons(id)

    return {
      props: {
        ...result,
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

export default WatchTV
