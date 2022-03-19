import { NavButton } from 'components/button'
import { FC } from 'react'

const Navbar: FC = () => {
  return (
    <div className="bg-primaryDark w-screen flex items-center sticky top-0 left-0 py-3 px-6 text-textDark gap-10">
      <div className="text-xl font-semibold">Posterr</div>
      <div className="flex gap-5">
        <NavButton to="/">Home</NavButton>
        <NavButton to="/profile">Profile</NavButton>
      </div>
    </div>
  )
}

export default Navbar
