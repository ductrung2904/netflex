import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import MovieGrid from '../components/Movie/MovieGrid'
import Meta from '../components/Shared/Meta'
import { search } from './api/api'
import { SearchResult } from './utils/types'

interface SearchProps {
  result: SearchResult
  newPage: boolean
  q: string
}

const Search: NextPage<SearchProps> = ({ result, newPage = false, q }) => {
  const router = useRouter()
  const [searchInputValue, setSearchInputValue] = useState('')

  const handleSearchFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (searchInputValue.trim()) {
      router.push({ pathname: '/search', query: { q: searchInputValue } })
    }
  }
  return (
    <>
      <Meta
        title={newPage ? 'Search - Netflex' : `${q} - Search - Netflex`}
        description={
          newPage ? 'Searching for movies' : `Search result for ${q}`
        }
        image=""
      />
      <div className="min-h-screen pt-24">
        {newPage ? (
          <form
            className="mx-8 flex flex-col items-center justify-center md:mt-12"
            onSubmit={handleSearchFormSubmit}
          >
            <h1 className="mb-6 text-center text-3xl">
              Find your favorite movies and TV shows
            </h1>
            <div className="relative w-full max-w-xl">
              <button
                className="absolute top-1/2 left-4 -translate-y-1/2"
                type="submit"
              >
                <FaSearch size={25} />
              </button>
              <input
                type="text"
                className="h-full w-full rounded bg-dark-darken p-3 pl-14 text-2xl text-gray-100 placeholder-gray-500 outline-none"
                value={searchInputValue}
                placeholder="Searching..."
                onChange={(e) => setSearchInputValue(e.target.value)}
                autoFocus
              />
            </div>
          </form>
        ) : (
          <div className="mx-10 md:mx-20">
            <h1 className="mb-8 text-2xl">
              Search result for &quot;{q}&quot; ({result.total_results}{' '}
              {result.total_results <= 1 ? 'result' : 'results'} found)
            </h1>
            <MovieGrid
              data={result.results}
              currentPage={result.page}
              maximumPage={result.total_pages}
              resolveLink={(page) =>
                `/search?q=${encodeURIComponent(q)}&page=${page}`
              }
            />
          </div>
        )}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const q = query.q as string
    const page = query.page ? Number(query.page) : 1

    if (!q) {
      return {
        props: {
          newPage: true,
        },
      }
    }

    const response = await search(q, page)

    return {
      props: {
        result: response,
        q,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}

export default Search
