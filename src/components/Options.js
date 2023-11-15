import React, { useContext, useState ,useEffect } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import { SocketContext } from './SocketContext'

const Options = ({children}) => {
  const { 
    callAccepted,
    name,
    setname,
    callEnded,
    Me,
    CallUser,
    EndCall,
   } = useContext(SocketContext);
   const [idToCall,setIdToCall] = useState("");
   const handleMessageInp = (event) =>{
    setIdToCall(event.target.value)
    }

    const [copyMsg,setCpyMsg] = useState("copy")

    const Copy__ = () =>{
      setCpyMsg('copied')
      setTimeout(500,()=>{
        setCpyMsg('copy')
      })
    }
    useEffect(()=>{
      // console.log("E",callEnded)
      // console.log("A",callAccepted)
      // console.log((callAccepted&&!callEnded))
  },[callAccepted,callEnded])
  return (
    <div className=' flex items-center gap-10
     max-sm:flex-col max-sm:gap-5 max-sm:mb-5 mb-5 '
     >
        {  !callAccepted ?
          <>
                

                <input className='w-[20vw] p-2 bg-black/0  focus:outline-none
                border-b-2 border-indigo-500 text-[#eae5ff]  max-sm:w-[65vw]
                ' type='text' 
                value={idToCall} placeholder='Make a call'
                 onChange={handleMessageInp}/>
                {
                  (callAccepted&&!callEnded)
                  ?
                    <>
                      
                    </>
                  :
                    <>
                      <button onClick={()=>CallUser(idToCall)} className=' w-5'>
                     { ((idToCall.trim() !== "")&&(idToCall !== Me
                     )) &&
                       <svg className='fill-green-500 scale-125' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                       <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0
                        46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 
                        38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3
                         11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2
                          18.4-30 11.6-46.3l-40-96z"/>
                     </svg>
                     }
                      </button>
                    </>
                    
                }
                
          </>
          :
          <>
                     <button onClick={EndCall} >
                        <svg className='fill-red-500 rotate-[135deg] scale-150 mb-10' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                          <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0
                            46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 
                            38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3
                            11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2
                              18.4-30 11.6-46.3l-40-96z"/>
                        </svg>
                      </button>
          </>
        }
        <div onClick={Copy__} className=' fixed top-10 right-7 h-5 w-5 max-sm:mr-4'>
          <CopyToClipboard  text={Me}>
              <div>{copyMsg}</div>
          </CopyToClipboard>
        </div>
        {children}
    </div>
  )
}

export default Options