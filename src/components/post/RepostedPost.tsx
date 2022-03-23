import Avatar from 'components/avatar'
import { usePosts, useUsers } from 'hooks'
import { FC, useMemo } from 'react'
import PostHeader from './PostHeader'

interface Props {
  id: ID
}
const RepostedPost: FC<Props> = ({ id }) => {
  const { posts } = usePosts()
  const { users } = useUsers()

  const post = useMemo(() => posts.find((p) => p.id === id), [id, posts])

  const author = useMemo(
    () => users.find((u) => u.id === post?.authorId),
    [post, users]
  )

  if (!post || !author) return null
  return (
    <div className="styled-box p-2 flex gap-2 w-full">
      <Avatar size="small" user={author} />
      <div className="flex flex-col gap-1">
        <PostHeader post={post} author={author} hideActions />
        <p className="break-words break-all">{post.content}</p>
      </div>
    </div>
  )
}

export default RepostedPost
