import { subDays, subHours } from 'date-fns'
import { useLocalStorage } from 'hooks'
import { createContext, FC } from 'react'
import { Post, VOID_FUNC } from 'types'
import { v4 as genId } from 'uuid'
import { defaultUsers } from './UserContext'

interface ContextProps {
  posts: Post[]
  addPost: (p: Post) => void
}

export const PostContext = createContext<ContextProps>({
  posts: [],
  addPost: VOID_FUNC,
})

const defaultPosts: Post[] = [
  {
    id: genId(),
    authorId: defaultUsers[0].id,
    content: 'First Posterr post! 😀',
    createdAt: subDays(new Date(), 1).toISOString(),
  },
  {
    id: genId(),
    authorId: defaultUsers[1].id,
    content: 'Testing Posterr out, looking good so far.',
    createdAt: subHours(new Date(), 2).toISOString(),
  },
  {
    id: genId(),
    authorId: defaultUsers[2].id,
    content: '🤩🤩🤩🤩🤩',
    createdAt: new Date().toISOString(),
  },
]

const PostContextProvider: FC = ({ children }) => {
  const [posts, setPosts] = useLocalStorage<Post[]>('posts', defaultPosts)

  const addPost = (post: Post) => {
    setPosts([post, ...posts])
  }

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  )
}

export default PostContextProvider
