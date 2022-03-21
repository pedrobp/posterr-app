import Navbar from 'components/navbar'
import { PostContextProvider, UserContextProvider } from 'contexts'
import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './pages'

const App: FC = () => {
  return (
    <UserContextProvider>
      <PostContextProvider>
        <Navbar />

        <div className="max-w-screen-lg m-auto px-2">
          <Routes>
            <Route path="/" element={<Navigate to="/all" />} />
            <Route path="/:mode" element={<Home />} />
          </Routes>
        </div>
      </PostContextProvider>
    </UserContextProvider>
  )
}

export default App
