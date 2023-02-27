import { HTMLProps } from 'react'
import type { NextPage } from 'next'

interface ButtonProps {
  className?: string
  type?: 'button' | 'submit' | 'reset' | undefined
}

const Button: NextPage<ButtonProps & HTMLProps<HTMLButtonElement>> = ({
  className,
  ...others
}) => {
  return (
    <button
      {...others}
      className={`bg-dark-lighten hover:bg-dark-darken flex items-center gap-2 whitespace-nowrap rounded-md py-3 px-6 text-white outline-none transition duration-300 ${className}`}
    ></button>
  )
}

export default Button
