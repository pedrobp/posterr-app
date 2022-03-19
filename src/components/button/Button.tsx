import { FC, HTMLProps } from 'react'

interface Props extends HTMLProps<HTMLButtonElement> {
  label: string
}

const Button: FC<Props> = (props) => {
  return <button onClick={props.onClick}>{props.label}</button>
}

export default Button
