import { NavButton } from 'components/button'
import { NewPost, Post } from 'components/post'
import { usePosts } from 'hooks'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { HomeRoute } from 'types'

const Home: FC = () => {
  const params = useParams<HomeRoute>()
  const { posts } = usePosts(params.mode)

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
              <div className="text-textSecondary">
                There are no posts to be shown here...
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
