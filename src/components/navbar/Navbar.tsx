import Avatar from 'components/avatar'
import { Button } from 'components/button'
import Menu from 'components/menu'
import Modal from 'components/modal'
import Selector from 'components/selector'
import { useUsers } from 'hooks'
import { Signpost, UserSwitch } from 'phosphor-react'
import { FC, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Navbar: FC = () => {
  const { users, currentUser, updateCurrentUser } = useUsers()
  const [, setQuery] = useSearchParams()
  const navigate = useNavigate()
  const [selectorOpen, setSelectorOpen] = useState(false)

  if (!currentUser) return null

  return (
    <>
      <div className="bg-primaryDark w-full flex items-center sticky top-0 left-0 py-3 px-28 text-textDark gap-10 z-10">
        <Button
          variant="raw"
          className="text-xl font-semibold flex gap-2 cursor-pointer fontx"
          onClick={() => navigate('/')}
        >
          Posterr
          <Signpost size={30} />
        </Button>
        <div className="flex gap-3 flex-1">
          <Button
            variant="raw"
            className="font-semibold"
            onClick={() => navigate('/home')}
          >
            Home
          </Button>
          <Button
            variant="raw"
            className="font-semibold"
            onClick={() =>
              setQuery({
                user: currentUser?.id,
              })
            }
          >
            My Profile
          </Button>
          <Button
            variant="raw"
            className="font-semibold"
            onClick={() => navigate('/search')}
          >
            Search
          </Button>
        </div>

        <Menu
          options={[
            {
              prefix: <UserSwitch size={22} />,
              label: 'Change User',
              action: () => setSelectorOpen(true),
            },
          ]}
        >
          {currentUser.name}
          <Avatar size="small" user={currentUser} />
        </Menu>
      </div>
      <Modal open={selectorOpen} onClose={() => setSelectorOpen(false)}>
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
