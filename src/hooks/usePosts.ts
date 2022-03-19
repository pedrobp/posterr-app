import { PostContext } from 'contexts'
import { useContext } from 'react'

export const usePosts = () => {
  const { posts, addPost } = useContext(PostContext)

  return {
    posts: posts.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)),
    addPost,
  }
}
