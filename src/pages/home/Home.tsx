import { NavButton } from 'components/button'
import Post from 'components/post'
import { usePosts } from 'hooks'
import { Profile } from 'pages'
import { FC } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { HomeRoute } from 'types'

const Home: FC = () => {
  const params = useParams<HomeRoute>()
  const { posts } = usePosts()
  const [query] = useSearchParams()

  return (
    <>
      <div className="flex flex-col gap-5 mt-5 items-center">
        <div className="flex gap-5 justify-center">
          <NavButton to="/all">All</NavButton>
          <NavButton to="/following">Following</NavButton>
        </div>

        {posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>

      {query.get('user') && <Profile />}
    </>
  )
}

export default Home
