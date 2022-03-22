import Avatar from 'components/avatar'
import { Button } from 'components/button'
import { usePosts, useUsers } from 'hooks'
import { ArrowsClockwise, Quotes } from 'phosphor-react'
import { FC, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Post as PostRecord } from 'types/entities'
import PostHeader from './PostHeader'
import RepostedPost from './RepostedPost'

interface Props {
  post: PostRecord
}

const Post: FC<Props> = ({ post }) => {
  const { users, currentUser } = useUsers()
  const [, setQuery] = useSearchParams()

  const author = useMemo(
    () => users.find((u) => u.id === post.authorId),
    [post.authorId, users]
  )

  const isCurrentUser = useMemo(
    () => post.authorId === currentUser?.id,
    [currentUser?.id, post.authorId]
  )

  if (!author) return null

  return (
    <div className="styled-box flex gap-4 w-full items-center">
      <div
        className="cursor-pointer"
        onClick={() => setQuery({ user: author.id })}
      >
        <Avatar user={author} />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <PostHeader post={post} author={author} hideActions={isCurrentUser} />

        {post.repostId ? (
          <RepostedPost id={post.repostId} />
        ) : (
          <div>{post.content}</div>
        )}
      </div>
    </div>
  )
}

export default Post
