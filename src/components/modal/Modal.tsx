import { FC, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

interface Props {
  open: boolean
  onClose: () => void
}

const Modal: FC<Props> = ({ children, open, onClose }) => {
  const ref = useRef(null)

  useOnClickOutside(ref, onClose)

  return open ? (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 grid place-content-center z-10">
      <div ref={ref}>{children}</div>
    </div>
  ) : null
}

export default Modal
