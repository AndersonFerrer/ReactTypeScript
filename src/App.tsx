import { Routes, Route } from 'react-router-dom'
import './App.css'
import Users from './pages/users'
import Sidebar from './components/sidebar'
import Comments from './pages/comments'
import UserDetail from './pages/user'

function App() {

  return (
    <>
      <div className='container'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Users />} />
          <Route path='/comments' element={<Comments />} />
          <Route path='/user/:id' element={<UserDetail />} />
        </Routes>
      </div>
    </>
  )
}

export default App
