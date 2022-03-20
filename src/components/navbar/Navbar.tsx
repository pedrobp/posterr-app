import Avatar from 'components/avatar'
import { NavButton } from 'components/button'
import Menu from 'components/menu'
import { useUsers } from 'hooks'
import { FC } from 'react'

const Navbar: FC = () => {
  const { currentUser } = useUsers()
  return (
    <div className="bg-primaryDark w-screen flex items-center sticky top-0 left-0 py-3 px-6 text-textDark gap-10">
      <div className="text-xl font-semibold">Posterr</div>
      <div className="flex gap-5 flex-1">
        <NavButton to="/">Home</NavButton>
        <NavButton to={`/profile?user=${currentUser?.id}`}>Profile</NavButton>
      </div>
      <Menu options={[{ label: 'Change User', action: () => console.log(1) }]}>
        <Avatar size="small" user={currentUser} />
      </Menu>
    </div>
  )
}

export default Navbar
