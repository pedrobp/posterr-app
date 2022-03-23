import clsx from 'clsx'
import { FC, HTMLProps, ReactNode } from 'react'

interface Props extends HTMLProps<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'raw'
  icon?: ReactNode
  small?: boolean
}

const Button: FC<Props> = ({ variant = 'primary', icon, small, ...props }) => (
  <button
    className={clsx(
      'button-base rounded-md font-semibold border-2 border-primary w-fit',
      {
        'text-white bg-primary hover:bg-primary hover:bg-opacity-90':
          variant === 'primary',
        'text-primary ': variant === 'secondary',
        'border-0 ': variant === 'raw',
        'filter grayscale cursor-default hover:bg-opacity-100': props.disabled,
        'p-1': small,
      },
      props.className
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
