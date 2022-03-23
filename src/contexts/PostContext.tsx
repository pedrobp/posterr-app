import { subDays, subHours } from 'date-fns'
import { useLocalStorage, useUsers, useToast } from 'hooks'
import { createContext, FC, useCallback } from 'react'
import { Post, VOID_FUNC } from 'types'
import { v4 as genId } from 'uuid'
import { defaultUsers } from './UserContext'

interface ContextProps {
  posts: Post[]
  post: (content: string) => void
  repost: (id: ID) => void
  quote: (id: ID, content: string) => void
}

export const PostContext = createContext<ContextProps>({
  posts: [],
  post: VOID_FUNC,
  repost: VOID_FUNC,
  quote: VOID_FUNC,
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
  const { currentUser } = useUsers()
  const { toast } = useToast()

  const post = useCallback(
    (content: string) => {
      if (!currentUser) return

      setPosts([
        {
          id: genId(),
          authorId: currentUser.id,
          content,
          createdAt: new Date().toISOString(),
        },
        ...posts,
      ])
      toast('Your post was sucessfully posted! 🥳')
    },
    [currentUser, posts, setPosts, toast]
  )

  const repost = useCallback(
    (id: ID) => {
      if (!currentUser) return
      setPosts([
        {
          id: genId(),
          authorId: currentUser.id,
          repostId: id,
          createdAt: new Date().toISOString(),
        },
        ...posts,
      ])
      toast('The post was sucessfully reposted! 🥳')
    },
    [currentUser, posts, setPosts, toast]
  )

  const quote = useCallback(
    (id: ID, content: string) => {
      if (!currentUser) return
      setPosts([
        {
          id: genId(),
          authorId: currentUser.id,
          content,
          quoteId: id,
          createdAt: new Date().toISOString(),
        },
        ...posts,
      ])
      toast('The post was sucessfully quoted! 🥳')
    },
    [currentUser, posts, setPosts, toast]
  )

  return (
    <PostContext.Provider value={{ posts, post, repost, quote }}>
      {children}
    </PostContext.Provider>
  )
}

export default PostContextProvider
