import Avatar from 'components/avatar'
import { NavButton } from 'components/button'
import Menu from 'components/menu'
import { useUsers } from 'hooks'
import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'

const Navbar: FC = () => {
  const { currentUser } = useUsers()
  const [, setQuery] = useSearchParams()

  if (!currentUser) return null
  return (
    <div className="bg-primaryDark w-screen flex items-center sticky top-0 left-0 py-3 px-6 text-textDark gap-10">
      <div className="text-xl font-semibold">Posterr</div>
      <div className="flex gap-5 flex-1">
        <NavButton to="/">Home</NavButton>
        <button
          onClick={() =>
            setQuery({
              user: currentUser?.id,
            })
          }
        >
          Profile
        </button>
      </div>
      <Menu options={[{ label: 'Change User', action: () => console.log(1) }]}>
        <Avatar size="small" user={currentUser} />
      </Menu>
    </div>
  )
}

export default Navbar
