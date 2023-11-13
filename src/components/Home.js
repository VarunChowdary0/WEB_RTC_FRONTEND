import React, { useContext, useState } from 'react'
import { SocketContext } from './SocketContext'

const Home = () => {
    const {name , setname} =  useContext(SocketContext)
    const [ MyName,
        setName] = useState(localStorage.getItem("MyName"))

    const SetMyName = () =>{
        localStorage.setItem("MyName",MyName);
        setname(MyName)
    }
    const CLearLocal = ()=>{
        localStorage.setItem("MyName",""); 
        setname("")
    }
  return (
    <div className=' w-full h-screen  flex items-center justify-center bg-[#1f1f1f]'>
        { (name.trim() === "" ) ?
            <div className=' flex items-center justify-center gap-5'>
                <input className='w-[10vw] p-2 bg-black/0  focus:outline-none
                    border-b-2 border-indigo-500 text-[#dcd6f3]  max-sm:w-[40vw]
                    ' type='text' 
                    value={MyName} placeholder='Name'
                    onChange={(e)=>setName(e.target.value)}/>
                <button onClick={SetMyName}
                 className=
                ' text-white bg-black/30 p-2 rounded-lg'>
                    continue
                </button>
            </div>
            :
            <div className=' flex gap-10 flex-col '>
                <a className=' text-[#bbaaff] text-center ' href='/videocall' >
                    {console.log(name)}
                    Make a video call ..
                </a>
                <div className=' font-thin text-center
                 text-yellow-100 hover:cursor-pointer' 
                 onClick={CLearLocal} > Change name </div>
            </div>
        }


    </div>
  )
}

export default Home