import Avatar from 'components/avatar'
import { format, parseISO } from 'date-fns'
import { useUsers } from 'hooks'
import { FC, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Post as PostRecord } from 'types/entities'

interface Props {
  post: PostRecord
}

const Post: FC<Props> = ({ post }) => {
  const { users } = useUsers()
  const [, setQuery] = useSearchParams()

  const author = useMemo(
    () => users.find((u) => u.id === post.authorId),
    [post.authorId, users]
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
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <span
            className="font-bold cursor-pointer"
            onClick={() => setQuery({ user: author.id })}
          >
            {author.name}
          </span>
          <span className="text-xs text-textSecondary">
            @{author.username} •{' '}
            {format(parseISO(post.createdAt), 'MMM dd, yyyy HH:mm')}
          </span>
        </div>
        <div>{post.content}</div>
      </div>
    </div>
  )
}

export default Post
