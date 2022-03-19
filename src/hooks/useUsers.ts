import { UserContext } from 'contexts'
import { useContext } from 'react'

export const useUsers = () => useContext(UserContext)
