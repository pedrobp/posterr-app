import Modal from 'components/modal'
import { usePosts } from 'hooks'
import { FC, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import NewPost from './NewPost'
import RepostedPost from './RepostedPost'

const QuotePost: FC = () => {
  const { posts } = usePosts()
  const [query, setQuery] = useSearchParams()

  const post = useMemo(
    () => posts.find((p) => p.id === query.get('quote')),
    [query, posts]
  )

  if (!post) return null
  return (
    <Modal open onClose={() => setQuery({})}>
      <div className="styled-box flex flex-col gap-5 bg-bg p-10 w-[600px] max-h-[90vh]">
        <RepostedPost id={post.id} />
        <NewPost quoteId={post.id} />
      </div>
    </Modal>
  )
}

export default QuotePost
