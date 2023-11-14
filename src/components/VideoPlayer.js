import React, { useContext } from 'react'
import { SocketContext } from './SocketContext'
import Random from './Random'

const VideoPlayer = () => {
  const {
    callAccepted,
    stream,
    name,
    call,
    OtherName,
   } = useContext(SocketContext)
  return (
    <>
        <div className='w-full h-full flex justify-around relative bg-[#272727]'>  
        {

            <div className={`${callAccepted ? 'opacity-1 scale-100': ' opacity-0 scale-0'} w-full h-full`}>
             <div className=' flex h-[90vh] items-center flex-col  justify-center bg-[#272727] w-full'>
                <video playsInline id="remoteVideo" autoPlay  className='w-fit rounded-md bg-[#3e3e3e]' />
                <p>{OtherName || 'Other'}</p>
            </div>
            <div className=' absolute bottom-8 right-5 
                        h-[200px] w-[300px] bg-slate-600
                        max-sm:h-[10vh] max-sm:w-[40vw] max-sm:bottom-[15vh]
                        flex justify-center items-center rounded-md flex-col
                        '>
                    <video playsInline id='myVideo' autoPlay muted className='w-fit bg-yello-500 
                                                    rounded-md  hover:scale-105 transition-all' />
                    <p className=' text-center'>{name || 'Me'}</p>
            </div>
            </div>
        }
        <Random/>
        {
            !stream && (
                <div className=' fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center flex-col'>
                    <p className='text-3xl'>Please allow permissions</p>
                </div>
            )
        }
      </div>
    </>
  )
}

export default VideoPlayer