import type { NextPage } from 'next'
import Link from 'next/link'
import { Item } from '../../pages/utils/types'
import Image from 'next/image'

// export default function Movie({ title, fetchUrl, isLargeRow = false }) {
//   const [movies, setMovies] = useState([])

//   useEffect(() => {
//     async function fetchData() {
//       const request = await axios.get(fetchUrl)
//       setMovies(request.data.results)
//       return request
//     }

//     fetchData()
//   }, [fetchUrl])

//   return (
//     <div className="mt-16 p-5">
//       <h2 className="text-2xl font-medium md:mb-5 md:text-4xl">{title}</h2>
//       <div className="ml-5 flex space-x-5 overflow-y-hidden overflow-x-scroll py-5 scrollbar-hide">
//         {movies?.map((movie) => (
//           <div
//             className={`${
//               isLargeRow
//                 ? 'h-auto flex-none py-6'
//                 : 'z:z-20 group h-48 w-80 flex-none transform cursor-pointer transition duration-200 ease-out hover:scale-110'
//             }`}
//           >
//             <img
//               src={`https://image.tmdb.org/t/p/original/${
//                 isLargeRow ? movie.poster_path : movie.backdrop_path
//               }`}
//               alt=""
//               className={
//                 isLargeRow
//                   ? 'h-48 transform cursor-pointer rounded-lg object-contain transition duration-150 ease-out hover:scale-110 md:h-72 md:w-48'
//                   : 'absolute z-0 h-full w-full rounded-md object-cover hover:brightness-50'
//               }
//             />
//             <h2
//               className={`${
//                 isLargeRow
//                   ? 'hidden'
//                   : 'absolute bottom-5 z-50 hidden w-full cursor-pointer px-3 text-center text-lg font-medium text-white group-hover:block'
//               }`}
//             >
//               {movie?.title || movie.name || movie.original_name}
//             </h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

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
        {/* <div className="ml-5 flex space-x-5 overflow-y-hidden overflow-x-scroll py-5 scrollbar-hide">
          <div
            className={`${
              isLargeRow
                ? 'h-auto flex-none py-6'
                : 'z:z-20 group h-48 w-80 flex-none transform cursor-pointer transition duration-200 ease-out hover:scale-110'
            }`}
          >
            <img
              src={`https://image.tmdb.org/t/p/original/${
                isLargeRow ? item.poster_path : item.backdrop_path
              }`}
              alt=""
              className={
                isLargeRow
                  ? 'h-48 transform cursor-pointer rounded-lg object-contain transition duration-150 ease-out hover:scale-110 md:h-72 md:w-48'
                  : 'absolute z-0 h-full w-full rounded-md object-cover hover:brightness-50'
              }
            />
            <h2
              className={`${
                isLargeRow
                  ? 'hidden'
                  : 'absolute bottom-5 z-50 hidden w-full cursor-pointer px-3 text-center text-lg font-medium text-white group-hover:block'
              }`}
            >
              {item?.title || item.name}
            </h2>
          </div>
        </div> */}
        <div className="group flex cursor-pointer flex-col items-center overflow-hidden rounded-lg">
          <Image
            src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
            width={width}
            height={height}
            className="object-cover group-hover:brightness-75"
            alt=""
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
