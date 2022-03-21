import clsx from 'clsx'
import { FC, HTMLProps, ReactNode } from 'react'

interface Props extends HTMLProps<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  icon?: ReactNode
}

const Button: FC<Props> = ({ variant = 'primary', icon, ...props }) => (
  <button
    className={clsx(
      'button-base rounded-md font-semibold py-2 border-2 border-primary w-fit',
      {
        'text-white bg-primary hover:bg-primary hover:bg-opacity-90':
          variant === 'primary',
        'text-primary bg-white': variant === 'secondary',
        'filter grayscale': props.disabled,
      }
    )}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    <div className="flex gap-2 items-center justify-center">
      {icon}
      {props.children}
    </div>
  </button>
)

export default Button
