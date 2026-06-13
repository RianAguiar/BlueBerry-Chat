import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import { useState } from 'react'
import './styles/App.css'
import Input from './components/Input'
import Button from './components/Button'
import Gsc from './components/Gsc'
import IndexForm from './components/IndexForm'

function App() {
  const eastereggemoji = '🧛‍♀️'
  return (
    <>
    <h1 id='avocadochat' className='avocadochat'>🥑Avocado Chat</h1>

    <div className='indexcontainerdad'>
      <div className='indexcontainer'>
        <IndexForm/>
      </div>
    </div>

    <div>
      <Gsc className='indexeasteregg'/>
    </div>
    </>
  )
}


export default App
