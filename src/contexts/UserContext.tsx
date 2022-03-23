import { useLocalStorage } from 'hooks'
import { createContext, FC, useCallback, useMemo } from 'react'
import { User, VOID_FUNC } from 'types'
import { v4 as genId } from 'uuid'

interface ContextProps {
  users: User[]
  currentUser?: User | null
  updateCurrentUser: (id: ID) => void
  manageFollower: (id: ID) => void
}

export const UserContext = createContext<ContextProps>({
  users: [],
  currentUser: null,
  updateCurrentUser: VOID_FUNC,
  manageFollower: VOID_FUNC,
})

export const defaultUsers: User[] = [
  {
    id: genId(),
    username: 'john19poster',
    name: 'John Poster',
    following: [],
    joinedOn: new Date().toISOString(),
    avatarUrl: '/assets/avatars/avatar_1.png',
  },
  {
    id: genId(),
    username: 'sanchezzz98',
    name: 'Louis Sanchez',
    following: [],
    joinedOn: new Date().toISOString(),
    avatarUrl: '/assets/avatars/avatar_2.png',
  },

  {
    id: genId(),
    username: 'bradycindy21',
    name: 'Cindy Brady',
    following: [],
    joinedOn: new Date().toISOString(),
    avatarUrl: '/assets/avatars/avatar_3.png',
  },
]

const UserContextProvider: FC = ({ children }) => {
  const [users, setUsers] = useLocalStorage<User[]>('users', defaultUsers)
  const [currentUserId, setCurrentUserId] = useLocalStorage<ID>(
    'currentUser',
    defaultUsers[0].id
  )

  const currentUser = useMemo(
    () => users.find((u) => u.id === currentUserId),
    [currentUserId, users]
  )

  const updateCurrentUser = useCallback(
    (id: ID) => {
      const user = users.find((u) => u.id === id)
      if (user) setCurrentUserId(user.id)
    },
    [setCurrentUserId, users]
  )

  const manageFollower = useCallback(
    (id: ID) => {
      if (!currentUser) return

      const newFollowers = currentUser.following.includes(id)
        ? currentUser.following.filter((i) => i !== id)
        : [...currentUser.following, id]

      setUsers((curr) => [
        ...curr.filter((u) => u.id !== currentUser.id),
        { ...currentUser, following: newFollowers },
      ])
    },
    [currentUser, setUsers]
  )

  return (
    <UserContext.Provider
      value={{ users, currentUser, updateCurrentUser, manageFollower }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
