import { Navbar } from 'components/navbar'
import { QuotePost } from 'components/post'
import {
  PostContextProvider,
  ToastContextProvider,
  UserContextProvider,
} from 'contexts'
import { FC } from 'react'
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import { Home, Profile, Search } from './pages'

const App: FC = () => {
  const [query] = useSearchParams()

  return (
    <ToastContextProvider>
      <UserContextProvider>
        <PostContextProvider>
          <Navbar />

          <div className="max-w-screen-lg m-auto px-2">
            <Routes>
              <Route path="/" element={<Navigate to="/all" />} />
              <Route path="/:mode" element={<Home />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </div>

          {query.get('user') && <Profile />}
          {query.get('quote') && <QuotePost />}
        </PostContextProvider>
      </UserContextProvider>
    </ToastContextProvider>
  )
}

export default App
