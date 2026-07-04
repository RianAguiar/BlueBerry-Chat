import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Index from './pages'
import Chat from './pages/Chat'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/sala/:nome" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App

