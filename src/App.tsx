import { FC } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Home, Profile } from './pages'

const App: FC = () => {
  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
