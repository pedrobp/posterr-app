import clsx from 'clsx'
import { FC, HTMLProps } from 'react'
interface Props extends HTMLProps<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

const Button: FC<Props> = ({ variant = 'primary', ...props }) => {
  return (
    <button
      className={clsx('rounded-xl font-bold py-2 border-2 border-primary', {
        'text-white bg-primary': variant === 'primary',
        'text-primary bg-white': variant === 'secondary',
      })}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default Button
