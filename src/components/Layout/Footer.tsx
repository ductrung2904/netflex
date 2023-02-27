import type { NextPage } from 'next'

const Footer: NextPage = () => {
  return (
    <div className="mt-14 h-12 items-center justify-between bg-dark-lighten px-7">
      <p className="hidden pt-3 text-center md:block">
        Copyright by K.Jun &copy;
      </p>
      <p className="block pt-3 text-center md:hidden">K.Jun &copy;</p>
    </div>
  )
}

export default Footer
