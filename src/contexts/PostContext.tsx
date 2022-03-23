import { isSameDay, parseISO, subDays } from 'date-fns'
import { useLocalStorage, useUsers, useToast } from 'hooks'
import { createContext, FC, useCallback, useMemo } from 'react'
import { Post, VOID_FUNC } from 'types'
import { v4 as genId } from 'uuid'
import { defaultUsers } from './UserContext'

interface ContextProps {
  posts: Post[]
  post: (content: string) => void
  repost: (id: ID) => void
  quote: (id: ID, content: string) => void
  dailyLimitReached: boolean
}

export const PostContext = createContext<ContextProps>({
  posts: [],
  post: VOID_FUNC,
  repost: VOID_FUNC,
  quote: VOID_FUNC,
  dailyLimitReached: false,
})

const defaultPosts: Post[] = [
  {
    id: genId(),
    authorId: defaultUsers[0].id,
    content: 'First Posterr post! 😀',
    createdAt: subDays(new Date(), 2).toISOString(),
  },
  {
    id: genId(),
    authorId: defaultUsers[1].id,
    content: 'Testing Posterr out, looking good so far.',
    createdAt: subDays(new Date(), 1).toISOString(),
  },
  {
    id: genId(),
    authorId: defaultUsers[2].id,
    content: '🤩🤩🤩🤩🤩',
    createdAt: subDays(new Date(), 1).toISOString(),
  },
]

const PostContextProvider: FC = ({ children }) => {
  const [posts, setPosts] = useLocalStorage<Post[]>('posts', defaultPosts)
  const { currentUser } = useUsers()
  const { toast } = useToast()

  const dailyLimitReached = useMemo(() => {
    const today = new Date()
    return (
      posts.filter(
        (p) =>
          isSameDay(parseISO(p.createdAt), today) &&
          p.authorId === currentUser?.id
      ).length >= 5
    )
  }, [currentUser?.id, posts])

  const post = useCallback(
    (content: string) => {
      if (!currentUser) return
      if (dailyLimitReached)
        return toast('You reached the limit number of posts per day! 🚫')

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
    [currentUser, dailyLimitReached, posts, setPosts, toast]
  )

  const repost = useCallback(
    (id: ID) => {
      if (!currentUser) return

      if (dailyLimitReached)
        return toast('You reached the limit number of posts per day! 🚫')

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
    [currentUser, dailyLimitReached, posts, setPosts, toast]
  )

  const quote = useCallback(
    (id: ID, content: string) => {
      if (!currentUser) return
      if (dailyLimitReached)
        return toast('You reached the limit number of posts per day! 🚫')

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
    [currentUser, dailyLimitReached, posts, setPosts, toast]
  )

  return (
    <PostContext.Provider
      value={{ posts, post, repost, quote, dailyLimitReached }}
    >
      {children}
    </PostContext.Provider>
  )
}

export default PostContextProvider
