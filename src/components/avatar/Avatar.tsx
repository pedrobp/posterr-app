import { FC, useMemo } from 'react'
import { User } from 'types'

interface Props {
  user?: User | null
  size?: 'medium' | 'large' | 'small'
}

const Avatar: FC<Props> = ({ user, size = 'medium' }) => {
  const getAvatarSize = useMemo(() => {
    switch (size) {
      case 'small':
        return 'h-8 w-8'
      case 'medium':
        return 'h-12 w-12'
      case 'large':
        return 'h-40 w-40'
    }
  }, [size])

  if (!user) return null

  return (
    <div className={getAvatarSize}>
      {user.avatarUrl ? (
        <img
          className="rounded-full"
          src={`${process.env.PUBLIC_URL}${user.avatarUrl}`}
          alt={user.username}
        />
      ) : (
        <div className="bg-slate-500 text-black rounded-full">
          {user.name.charAt(0)}
        </div>
      )}
    </div>
  )
}

export default Avatar
