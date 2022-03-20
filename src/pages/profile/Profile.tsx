import Avatar from 'components/avatar'
import { Button } from 'components/button'
import Modal from 'components/modal'
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

  if (!user || !currentUser) return null
  return (
    <Modal open onClose={() => setQuery({})}>
      <div className="styled-box flex flex-col gap-5 mt-4 bg-bg p-10">
        <div className="flex gap-10 items-center">
          <div>
            <Avatar size="large" user={user} />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-bold">{user.name}</span>
            <span className="text-textSecondary">@{user.username} </span>
            <span className="text-textSecondary">
              Joined on {format(parseISO(user.joinedOn), 'MMM dd, yyyy')}{' '}
            </span>
            {user.id !== currentUser.id && (
              <Button
                variant={
                  currentUser.following.includes(user.id)
                    ? 'secondary'
                    : 'primary'
                }
                onClick={() => manageFollower(user.id)}
              >
                {currentUser.following.includes(user.id)
                  ? 'Unfollow'
                  : 'Follow'}
              </Button>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-bold">Followers</span>
            <span>
              {users.filter((u) => u.following.includes(currentUser.id)).length}
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
      </div>
    </Modal>
  )
}

export default Profile
