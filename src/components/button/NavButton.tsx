import clsx from 'clsx'
import { FC } from 'react'
import { NavLink, NavLinkProps, useParams } from 'react-router-dom'
import { HomeRoute } from 'types'

interface Props extends NavLinkProps {
  match: string
}

const NavButton: FC<Props> = ({ match, ...props }) => {
  const params = useParams<HomeRoute>()

  return (
    <NavLink
      {...props}
      className={clsx(
        'button-base font-semibold border-2 border-opacity-0 min-w-[75px] grid place-content-center',
        {
          'text-primary border-primary border-opacity-100':
            params.mode === match.toLowerCase(),
        }
      )}
    >
      {props.children}
    </NavLink>
  )
}

export default NavButton
