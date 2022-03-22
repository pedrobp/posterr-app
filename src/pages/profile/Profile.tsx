import Avatar from 'components/avatar'
import { Button } from 'components/button'
import Modal from 'components/modal'
import { NewPost, Post } from 'components/post'
import { format, parseISO } from 'date-fns'
import { usePosts, useUsers } from 'hooks'
import { FC, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

const Profile: FC = () => {
  const { users, currentUser, manageFollower } = useUsers()
  const { posts } = usePosts()
  const [query, setQuery] = useSearchParams()

  const user = useMemo(
    () => users.find((u) => u.id === query.get('user')),
    [query, users]
  )
  const userPosts = useMemo(
    () => posts.filter((p) => p.authorId === user?.id),
    [posts, user?.id]
  )

  const isCurrentUser = useMemo(
    () => user?.id === currentUser?.id,
    [currentUser?.id, user?.id]
  )

  if (!user || !currentUser) return null
  return (
    <Modal open={!!user} onClose={() => setQuery({})}>
      <div className="styled-box flex flex-col gap-5 bg-bg p-10 w-[700px] max-h-[95vh]">
        <div className="flex gap-14 items-center">
          <Avatar size="large" user={user} />
          <div className="flex flex-col gap-2 flex-1">
            <span className="text-2xl font-bold">{user.name}</span>
            <span className="text-textSecondary">@{user.username} </span>
            <span className="text-textSecondary">
              Joined on {format(parseISO(user.joinedOn), 'MMM dd, yyyy')}{' '}
            </span>
          </div>
          {!isCurrentUser && (
            <Button
              variant={
                currentUser.following.includes(user.id)
                  ? 'secondary'
                  : 'primary'
              }
              onClick={() => manageFollower(user.id)}
            >
              {currentUser.following.includes(user.id) ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </div>

        <div className="flex text-center">
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-bold">Followers</span>
            <span>
              {users.filter((u) => u.following.includes(user.id)).length}
            </span>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-bold">Following</span>
            <span>{user.following.length}</span>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-bold">Posts</span>
            <span>{userPosts?.length}</span>
          </div>
        </div>

        {isCurrentUser && <NewPost />}

        <div className="flex flex-col gap-2  overflow-auto">
          {userPosts.map((p) => (
            <Post key={p.id} post={p} />
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default Profile
