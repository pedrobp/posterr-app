import { Button } from 'components/button'
import Collapse from 'components/collapse'
import TextArea from 'components/input'
import { usePosts } from 'hooks'
import { Check, Plus } from 'phosphor-react'
import { FC, useState } from 'react'

const NewPost: FC = () => {
  const [postOpen, setPostOpen] = useState(false)
  const [postContent, setPostContent] = useState('')

  const { addPost } = usePosts()

  return (
    <>
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
    </>
  )
}

export default NewPost
