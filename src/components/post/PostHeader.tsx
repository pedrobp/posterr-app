import { Button } from 'components/button'
import { format, parseISO } from 'date-fns'
import { usePosts } from 'hooks'
import { ArrowsClockwise, Quotes } from 'phosphor-react'
import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Post, User } from 'types'

interface Props {
  post: Post
  author: User
  hideActions?: boolean
}

const PostHeader: FC<Props> = ({ post, author, hideActions }) => {
  const [, setQuery] = useSearchParams()
  const { repost } = usePosts()

  return (
    <div className="flex gap-2 items-center">
      <span
        className="font-bold cursor-pointer"
        onClick={() => setQuery({ user: author.id })}
      >
        {author.name}
      </span>
      <span className="text-xs text-textSecondary flex-1">
        @{author.username} •{' '}
        {format(parseISO(post.createdAt), 'MMM dd, yyyy HH:mm')}
      </span>
      {!hideActions && (
        <div className="flex gap-4 justify-end">
          <Button
            small
            variant="secondary"
            icon={<ArrowsClockwise weight="bold" />}
            onClick={() => repost(post.id)}
          />
          <Button small variant="secondary" icon={<Quotes weight="bold" />} />
        </div>
      )}
    </div>
  )
}

export default PostHeader
