import { Button } from 'components/button'
import Collapse from 'components/collapse'
import TextArea from 'components/input'
import { usePosts } from 'hooks'
import { Check, Plus } from 'phosphor-react'
import { FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HomeRoute } from 'types'

const NewPost: FC = () => {
  const [postOpen, setPostOpen] = useState(false)
  const [postContent, setPostContent] = useState('')
  const navigate = useNavigate()
  const params = useParams<HomeRoute>()
  const { post } = usePosts()

  return (
    <>
      <Collapse open={postOpen}>
        <TextArea
          id="add-post-content"
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
              post(postContent)
              setPostContent('')
              if (params.mode === 'following') navigate('/all')
            } else {
              setPostOpen(true)
              document.getElementById('add-post-content')?.focus()
            }
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
          {postOpen ? 'Post!' : 'New Post'}
        </Button>
      </div>
    </>
  )
}

export default NewPost
