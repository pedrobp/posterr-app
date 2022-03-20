import clsx from 'clsx'
import { FC } from 'react'

interface Props {
  open: boolean
}

const Collapse: FC<Props> = ({ open, children }) => {
  return (
    <div
      className={clsx(
        'scale-y-0 h-0 overflow-hidden transition-all origin-top w-full',
        {
          'scale-y-100 h-full': open,
        }
      )}
    >
      {children}
    </div>
  )
}

export default Collapse
