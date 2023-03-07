import type { GetStaticProps, NextPage } from 'next'
import { getHomeData } from './api/api'
import Banner from '../components/Layout/Banner'
import MovieSlider from '../components/Movie/MovieSlider'
import Meta from '../components/Shared/Meta'
import { Item } from './utils/types'
import { Fragment } from 'react'

interface HomePages {
  data: {
    [id: string]: Item[]
  }
  main: Item
}

const Home: NextPage<HomePages> = ({ data, main }) => {
  return (
    <>
      <Meta
        title="Home - Netflex"
        description="Watch your favorite movies and TV shows in out website."
        image=""
      />
      <div className="min-h-screen text-white">
        <Banner main={main} />
        {Object.keys(data).map((item, index) => (
          <Fragment key={item}>
            <h1
              className={`mb-3 ml-4 text-2xl md:ml-16 ${
                index === 0 ? 'mt-16 md:mt-8' : 'mt-8'
              }`}
            >
              {item}
            </h1>
            <MovieSlider data={data[item]} />
          </Fragment>
        ))}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const data = await getHomeData()

    const trending = data['Trending Movies']

    const main = trending[new Date().getDate() % trending.length]

    return {
      props: {
        data,
        main,
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

export default Home
