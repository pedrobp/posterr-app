import Avatar from 'components/avatar'
import { useUsers } from 'hooks'
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
    <div className="styled-box flex gap-3 w-full">
      <div
        className="cursor-pointer"
        onClick={() => setQuery({ user: author.id })}
      >
        <Avatar user={author} />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <PostHeader
          post={post}
          author={author}
          hideActions={isCurrentUser || !!post.repostId}
        />

        {post.repostId ? (
          <RepostedPost id={post.repostId} />
        ) : (
          <>
            <div>{post.content}</div>
            {post.quoteId && <RepostedPost id={post.quoteId} />}
          </>
        )}
      </div>
    </div>
  )
}

export default Post
