import { FC, HTMLProps } from 'react'

const Input: FC<HTMLProps<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className="w-full border-2 rounded-md focus:border-primary outline-none p-2"
  />
)

export default Input
