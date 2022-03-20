import { FC, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

export type Option = {
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
    <>
      <div className="relative cursor-pointer" onClick={() => setOpen(!open)}>
        {children}
      </div>

      <div
        ref={menuRef}
        className={`styled-box absolute top-full right-0 bg-bg text-text py-2 px-0 transition-all ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
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
    </>
  )
}

export default Menu
