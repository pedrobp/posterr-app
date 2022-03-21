import { Button, NavButton } from 'components/button'
import Collapse from 'components/collapse'
import TextArea from 'components/input'
import Post from 'components/post'
import { usePosts } from 'hooks'
import { Profile } from 'pages'
import { Check, Plus } from 'phosphor-react'
import { FC, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { HomeRoute } from 'types'

const Home: FC = () => {
  const params = useParams<HomeRoute>()
  const { posts, addPost } = usePosts(params.mode)
  const [query] = useSearchParams()
  const [postOpen, setPostOpen] = useState(false)
  const [postContent, setPostContent] = useState('')

  return (
    <>
      <div className="flex gap-10 mt-5">
        <div className="flex flex-col gap-5">
          <NavButton match="all" to="/all">
            All
          </NavButton>
          <NavButton match="following" to="/following">
            Following
          </NavButton>
        </div>

        <div className="flex-1 flex flex-col">
          <Collapse open={postOpen}>
            <TextArea
              maxLength={777}
              value={postContent}
              placeholder="What's up?"
              onChange={(e) => setPostContent(e.currentTarget.value)}
              rows={4}
            />
            <div className="text-textSecondary text-xs leading-tight">
              {postContent.length}/777
            </div>
          </Collapse>

          <div className="flex justify-end">
            <Button
              onClick={() => {
                if (postOpen) {
                  addPost(postContent)
                  setPostContent('')
                }
                setPostOpen(!postOpen)
              }}
              disabled={postOpen && postContent.trim() === ''}
              icon={
                postOpen ? (
                  <Check size={22} weight="bold" />
                ) : (
                  <Plus size={22} weight="bold" />
                )
              }
            >
              {postOpen ? 'Post!' : 'Add Post'}
            </Button>
          </div>

          <div className="flex flex-col gap-5 my-5">
            {posts.length > 0 ? (
              posts.map((p) => <Post key={p.id} post={p} />)
            ) : (
              <div>There are no posts yet...</div>
            )}
          </div>
        </div>
      </div>

      {query.get('user') && <Profile />}
    </>
  )
}

export default Home
