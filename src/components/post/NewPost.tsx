/* eslint-disable quotes */
import { Button } from 'components/button'
import Collapse from 'components/collapse'
import TextArea from 'components/input'
import { usePosts } from 'hooks'
import { Check, Plus } from 'phosphor-react'
import { FC, useCallback, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { HomeRoute } from 'types'

interface Props {
  quoteId?: ID
}
const NewPost: FC<Props> = ({ quoteId }) => {
  const [postOpen, setPostOpen] = useState(!!quoteId)
  const [postContent, setPostContent] = useState('')
  const [, setQuery] = useSearchParams()
  const navigate = useNavigate()
  const params = useParams<HomeRoute>()
  const { post, quote } = usePosts()

  const submit = useCallback(() => {
    if (quoteId) {
      quote(quoteId, postContent)
      setQuery({})
    } else if (postOpen) {
      post(postContent)
      setPostContent('')
      if (params.mode === 'following') navigate('/all')
    }
  }, [
    navigate,
    params.mode,
    post,
    postContent,
    postOpen,
    quote,
    quoteId,
    setQuery,
  ])

  return (
    <>
      <Collapse open={postOpen}>
        <TextArea
          id="add-post-content"
          maxLength={777}
          value={postContent}
          placeholder={quoteId ? 'Quote the post above!' : "What's up?"}
          onChange={(e) => setPostContent(e.currentTarget.value)}
          rows={4}
          autoFocus
        />
        <div className="text-textSecondary text-xs leading-tight">
          {postContent.length}/777
        </div>
      </Collapse>

      <div className="flex justify-end">
        <Button
          onClick={() => {
            if (postOpen) {
              submit()
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
