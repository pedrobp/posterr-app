import clsx from 'clsx'
import { FC, ReactNode } from 'react'

interface Option {
  id: ID
  icon?: ReactNode
  title: string
  description: string
}
interface Props {
  title?: string
  selected: ID[]
  options: Option[]
  onSelect: (id: ID) => void
}

const Selector: FC<Props> = ({ options, selected, onSelect, title }) => {
  return (
    <div className="styled-box p-10 bg-bg flex flex-col text-center gap-5">
      <span className="font-bold text-lg">{title}</span>
      <div className="flex gap-10 ">
        {options.map((o) => (
          <div
            key={o.id}
            onClick={() => onSelect(o.id)}
            className={clsx(
              'button-base border-4 shadow-md p-10 flex flex-col gap-5 rounded-xl',
              {
                'border-primary': selected.includes(o.id),
              }
            )}
          >
            {o.icon}
            <div className="flex flex-col gap-2">
              <span className="font-bold">{o.title}</span>
              <span className="text-textSecondary">{o.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Selector
