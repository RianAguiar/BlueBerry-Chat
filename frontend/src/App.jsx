import { useState } from 'react'
import './styles/App.css'
import HelloWorld from './components/HelloWorld'
import SayMyName from './components/SayMyName'
import User from './components/User'

function App() {
  const emoji = '❤'
  return (
    <>
    <div className='indextopcontainer'>
      <button id='signup' className='signup'>sign up</button>
      <button id='signin' className='signin'>sign in</button>
    </div>

    <h1 id='avocadochat' className='avocadochat'>{emoji}🥑Avocado Chat</h1>

    <div className='indexcontainer'>
      <input type="" name="" id="indexinput" placeholder='Room Name' className='indexinput'/>
      <button id='indexenterbutton' className='indexenterbutton'>Enter</button>
    </div>
    <div>
      <HelloWorld/>
      <SayMyName name='Ryan'/>
      <User photo='urlphoto' username='Ryan'/>
    </div>
    </>
  )
}


export default App


