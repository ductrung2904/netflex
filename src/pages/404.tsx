import { NextPage } from 'next'
import Meta from '../components/Shared/Meta'

const NotFound: NextPage = () => {
  return (
    <>
      <Meta
        title="404 Not Found - Netflex"
        description="404 Not Found"
        image="/images/404.png"
      />
      <div className="flex h-screen items-center justify-center">
        <img src="/images/404.png" alt="" />
      </div>
    </>
  )
}

export default NotFound
