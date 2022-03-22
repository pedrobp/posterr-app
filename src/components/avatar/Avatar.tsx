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
        return 'h-8 w-8 min-w-[2rem] min-h-[2rem]'
      case 'medium':
        return 'h-14 w-14'
      case 'large':
        return 'h-36 w-36'
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
