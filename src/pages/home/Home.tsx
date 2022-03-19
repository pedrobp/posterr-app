import { NavButton } from 'components/button'
import Post from 'components/post'
import { usePosts } from 'hooks'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { HomeRoute } from 'types'

const Home: FC = () => {
  const params = useParams<HomeRoute>()
  const { posts } = usePosts()

  return (
    <div className="flex flex-col gap-5 mt-5 items-center">
      <div className="flex gap-5 justify-center">
        <NavButton to="/home/all">All</NavButton>
        <NavButton to="/home/following">Following</NavButton>
      </div>

      {posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </div>
  )
}

export default Home
