import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { FaSearch } from 'react-icons/fa'

const Header: NextPage = () => {
  const [show, setShow] = useState(false)

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar)
    return () => window.removeEventListener('scroll', transitionNavBar)
  }, [])

  return (
    <div
      className={`fixed top-0 z-10 h-[4rem] max-h-16 w-screen items-center py-3 px-3 transition-all duration-500 ease-in md:px-7 ${
        show && 'bg-black'
      }`}
    >
      <div className="flex justify-between">
        <Link href="/">
          <a className="h-full w-auto">
            <img
              src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
              alt=""
              className="fixed top-3 w-[160px] object-contain"
            />
          </a>
        </Link>
        <Link href="/search">
          <a>
            <FaSearch
              className="mr-4 mt-[4px] cursor-pointer text-white"
              size={25}
            />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Header
