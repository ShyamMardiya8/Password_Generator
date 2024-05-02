import { useState, useCallback, useEffect, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [Length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setpassword] = useState("")

  const passwordref = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numberAllowed) str+= "01234567890"
    if(charAllowed)  str+='!@##$%^&*())_'

    for (let i = 0; i <= Length; i++) {
    let  char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setpassword(pass)

  },[Length, numberAllowed, charAllowed, setpassword])
  const handleCopy =  useCallback => {
    passwordref.current?.select()
    window.navigator.clipboard.writeText(password)
  } 
  useEffect(() => {
    passwordGenerator()
  },[Length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
    <div>
      <input type="text"
      value={password}
      placeholder='password'
      readOnly
      ref={passwordref}
      />
      <button
      onClick={handleCopy}>copy</button>
      <br />
      <input type="range"
      value={Length}
      min={6}
      max={100}
      onChange={(e) => {setLength(e.target.value)}} />
      <label >length {Length}</label>
      <br />
      <input type="checkbox" 
      defaultChecked ={numberAllowed} 
      id='numberInput'
      onChange={() => {
        setnumberAllowed((prev) => !prev)
      }}/>
      <label htmlFor="">Number</label>
      <br />
      <input type="checkbox" 
      defaultChecked ={charAllowed} 
      id='numberInput'
      onChange={() => {
        setcharAllowed((prev) => !prev)
      }}/>
      <label htmlFor="">Char</label>
      <br />
      </div>
    </>
  )
}

export default App
