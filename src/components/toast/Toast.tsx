import clsx from 'clsx'
import { FC } from 'react'

interface Props {
  message: string
  show: boolean
}

const Toast: FC<Props> = ({ message, show }) => (
  <div
    className={clsx(
      'styled-box fixed left-1/2 -translate-x-1/2 -top-20 transition-all z-20 bg-bg border-primary text-primaryDark',
      {
        'translate-y-24': show,
      }
    )}
  >
    {message}
  </div>
)

export default Toast
