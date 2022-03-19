import Navbar from 'components/navbar'
import { PostContextProvider, UserContextProvider } from 'contexts'
import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Home, Profile } from './pages'

const App: FC = () => {
  return (
    <UserContextProvider>
      <PostContextProvider>
        <Navbar />

        <div className="max-w-[1024px] m-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/home/all" />} />
            <Route path="/home/:mode" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </PostContextProvider>
    </UserContextProvider>
  )
}

export default App
