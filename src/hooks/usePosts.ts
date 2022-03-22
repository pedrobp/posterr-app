import { PostContext } from 'contexts'
import { useContext } from 'react'
import { useUsers } from './useUsers'

export const usePosts = (filter?: 'all' | 'following') => {
  const { posts, ...context } = useContext(PostContext)
  const { currentUser } = useUsers()

  const processedPosts = posts
    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
    .filter((p) =>
      filter === 'following'
        ? currentUser?.following.includes(p.authorId)
        : true
    )

  return {
    posts: processedPosts,
    ...context,
  }
}
