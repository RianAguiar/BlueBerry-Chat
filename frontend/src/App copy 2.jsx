import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Index from './pages'
import Chat from './pages/Chat'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App


