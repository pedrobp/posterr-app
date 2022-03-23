import { Button } from 'components/button'
import { Input } from 'components/input'
import { Post } from 'components/post'
import { usePosts } from 'hooks'
import { MagnifyingGlass } from 'phosphor-react'
import { FC, useCallback, useState } from 'react'
import { Post as PostType } from 'types'

const Search: FC = () => {
  const [value, setValue] = useState('')
  const { posts } = usePosts()
  const [results, setResults] = useState<PostType[]>()

  const search = useCallback(
    (e) => {
      e.preventDefault()
      if (value)
        setResults(
          posts.filter((p) =>
            p.content?.toLowerCase().includes(value.toLowerCase())
          )
        )
    },
    [posts, value]
  )

  return (
    <form
      className="flex flex-col gap-4 max-w-3xl m-auto mt-4"
      onSubmit={search}
    >
      <Input
        name="haha"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder="Search for posts..."
        autoFocus
      />
      <div className="flex justify-end">
        <Button type="submit" icon={<MagnifyingGlass />}>
          Search
        </Button>
      </div>

      <div className="flex flex-col gap-5 ">
        {results ? (
          results.length > 0 ? (
            results.map((p) => <Post key={p.id} post={p} />)
          ) : (
            <div className="text-textSecondary">No results were found...</div>
          )
        ) : (
          <></>
        )}
      </div>
    </form>
  )
}

export default Search
