import { NavButton } from 'components/button'
import { NewPost, Post } from 'components/post'
import QuotePost from 'components/post/QuotePost'
import { usePosts } from 'hooks'
import { Profile } from 'pages'
import { FC } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { HomeRoute } from 'types'

const Home: FC = () => {
  const params = useParams<HomeRoute>()
  const { posts } = usePosts(params.mode)
  const [query] = useSearchParams()

  return (
    <>
      <div className="flex gap-10 mt-5">
        <div className="flex flex-col gap-5 w-1/5">
          <NavButton match="all" to="/all">
            All
          </NavButton>
          <NavButton match="following" to="/following">
            Following
          </NavButton>
        </div>

        <div className="flex-1 flex flex-col">
          <NewPost />

          <div className="flex flex-col gap-5 my-5">
            {posts.length > 0 ? (
              posts.map((p) => <Post key={p.id} post={p} />)
            ) : (
              <div>There are no posts to be shown here...</div>
            )}
          </div>
        </div>
      </div>

      {query.get('user') && <Profile />}
      {query.get('quote') && <QuotePost />}
    </>
  )
}

export default Home
