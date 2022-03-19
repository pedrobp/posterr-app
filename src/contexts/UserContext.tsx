import { useLocalStorage } from 'hooks'
import { createContext, FC, useCallback } from 'react'
import { User, VOID_FUNC } from 'types'
import { v4 as genId } from 'uuid'

interface ContextProps {
  users: User[]
  currentUser: User | null
  changeCurrentUser: (id: ID) => void
}

export const UserContext = createContext<ContextProps>({
  users: [],
  currentUser: null,
  changeCurrentUser: VOID_FUNC,
})

export const defaultUsers: User[] = [
  {
    id: genId(),
    username: 'john.poster',
    name: 'John Poster',
    followers: [],
    following: [],
    joinedOn: new Date().toISOString(),
    posts: [],
  },
  {
    id: genId(),
    username: 'bradycindy21',
    name: 'Cindy Brady',
    followers: [],
    following: [],
    joinedOn: new Date().toISOString(),
    posts: [],
  },
  {
    id: genId(),
    username: 'sanchezzz98',
    name: 'Louis Sanchez',
    followers: [],
    following: [],
    joinedOn: new Date().toISOString(),
    posts: [],
  },
]

const UserContextProvider: FC = ({ children }) => {
  const [users] = useLocalStorage<User[]>('users', defaultUsers)
  const [currentUser, setCurrentUser] = useLocalStorage<User>(
    'currentUser',
    defaultUsers[0]
  )

  const changeCurrentUser = useCallback((id: ID) => {
    const user = users.find((u) => u.id === id)
    if (user) setCurrentUser(user)
  }, [])

  return (
    <UserContext.Provider value={{ users, currentUser, changeCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
