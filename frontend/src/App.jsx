import { useState } from 'react'
import './styles/App.css'
import Input from './components/Input'
import Button from './components/Button'

function App() {
  const eastereggemoji = '🧛‍♀️'
  return (
    <>
    <h1 id='avocadochat' className='avocadochat'>🥑Avocado Chat</h1>

    <div className='indexcontainerdad'>
      <div className='indexcontainer'>
        <Input placeholder='Your Name' className='indexinput'/>
        <Input placeholder='Room Name' className='indexinput'/>
        <Button written='Get In' className='indexenterbutton'/>
      </div>
    </div>

    <div className='indexeasteregg'>
        <p>{eastereggemoji}</p>
    </div>
    </>
  )
}


export default App


