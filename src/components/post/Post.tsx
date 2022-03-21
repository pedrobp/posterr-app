import Avatar from 'components/avatar'
import { Button } from 'components/button'
import { format, parseISO } from 'date-fns'
import { useUsers } from 'hooks'
import { ArrowsClockwise, Quotes } from 'phosphor-react'
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
      <div className="flex flex-col gap-2 w-full">
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
        {
          <div className="flex gap-4 justify-end">
            <Button small icon={<ArrowsClockwise weight="bold" />}>
              Repost
            </Button>
            <Button small icon={<Quotes weight="bold" />}>
              Quote
            </Button>
          </div>
        }
      </div>
    </div>
  )
}

export default Post
