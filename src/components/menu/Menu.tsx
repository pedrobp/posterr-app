import clsx from 'clsx'
import { FC, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

interface Option {
  label: string
  action: () => void
}

interface Props {
  options: Option[]
}

const Menu: FC<Props> = ({ children, options }) => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useOnClickOutside(menuRef, () => setOpen(false))

  return (
    <div className="relative">
      <div
        className="hover:bg-white hover:bg-opacity-10 cursor-pointer rounded-md flex gap-4 p-2 items-center"
        onClick={() => setOpen(!open)}
      >
        {children}
      </div>

      <div
        ref={menuRef}
        className={clsx(
          'styled-box absolute top-full left-1/2 -translate-x-1/2 w-max bg-bg text-text py-2 px-0 mt-1 transition-all',
          {
            'opacity-100 visible': open,
            'opacity-0 invisible': !open,
          }
        )}
      >
        {options.map((o) => (
          <div
            key={o.label}
            onClick={o.action}
            className="hover:bg-gray-200 py-1 px-4 select-none cursor-pointer"
          >
            {o.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menu
