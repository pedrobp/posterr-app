import { format, parseISO } from 'date-fns'
import { useUsers } from 'hooks'
import { FC } from 'react'
import { Post } from 'types/entities'

interface Props {
  post: Post
}
const PostBubble: FC<Props> = ({ post }) => {
  const { users } = useUsers()

  const author = users.find((u) => u.id === post.authorId)

  if (!author) return null

  return (
    <div className="border-2 rounded-lg shadow-md p-5 flex flex-col gap-2 w-3/5">
      <div className="flex gap-2 items-center">
        <span className="font-bold">{author.name}</span>
        <span className="text-xs text-textSecondary">
          @{author.username} •{' '}
          {format(parseISO(post.createdAt), 'yyyy, MMM dd HH:mm')}
        </span>
      </div>
      <div>{post.content}</div>
    </div>
  )
}

export default PostBubble
