import { FC } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

const NavButton: FC<NavLinkProps> = (props) => {
  return <NavLink {...props}>{props.children}</NavLink>
}

export default NavButton
