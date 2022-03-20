import Avatar from 'components/avatar'
import Menu from 'components/menu'
import Modal from 'components/modal'
import Selector from 'components/selector'
import { useUsers } from 'hooks'
import { FC, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const Navbar: FC = () => {
  const { users, currentUser, updateCurrentUser } = useUsers()
  const [, setQuery] = useSearchParams()
  const [open, setOpen] = useState(false)

  if (!currentUser) return null
  return (
    <>
      <div className="bg-primaryDark w-screen flex items-center sticky top-0 left-0 py-3 px-36 text-textDark gap-10">
        <div className="text-xl font-semibold">Posterr</div>
        <div className="flex gap-5 flex-1">
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

        <Menu options={[{ label: 'Change User', action: () => setOpen(true) }]}>
          {currentUser.name}
          <Avatar size="small" user={currentUser} />
        </Menu>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Selector
          title="Select a user"
          options={users
            .sort((a, b) => (a.name < b.name ? -1 : 1))
            .map((u) => ({
              id: u.id,
              title: u.name,
              description: `@${u.username}`,
              icon: <Avatar size="large" user={u} />,
            }))}
          selected={[currentUser.id]}
          onSelect={updateCurrentUser}
        />
      </Modal>
    </>
  )
}

export default Navbar
