import React, { useContext } from 'react'
import { SocketContext } from './SocketContext'
import Random from './Random'

const VideoPlayer = () => {
  const {
    callAccepted,
    stream,
    name,
    call,
   } = useContext(SocketContext)
  return (
    <>
        <div className='w-full h-full flex justify-around relative bg-[#272727]'>  
        {

            <div className={`${callAccepted ? 'opacity-1 scale-100': ' opacity-0 scale-0'} w-full h-full`}>
             <div className=' flex items-center flex-col  justify-center bg-[#272727] w-full'>
                <video playsInline id="remoteVideo" autoPlay  className='w-fit rounded-md bg-[#3e3e3e]' />
                <p>{call.name || 'Other'}</p>
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
        {/* {
            (stream && !callAccepted) && (
                <div className='fixed top-[30vh] bottom-[50%]  h-[45vh] overflow-y-auto
                 flex-col gap-7 flex justify-center w-[60vw]
                  items-center'>
                    <div className=' flex flex-wrap gap-7 scrollable-container 
                    justify-center items-center pt-10 pb-10 pr-4 pl-4
                     '>

                        <div className=' p-2  bg-[#673ec8] rounded-md'>Random Preson 1</div>
                        <div className=' p-2  bg-[#673ec8] rounded-md'>Random Preson 2</div>
                        <div className=' p-2  bg-[#673ec8] rounded-md'>Random Preson 3</div>
                        <div className=' p-2  bg-[#673ec8] rounded-md'>Random Preson 4</div>
                        <div className=' p-2  bg-[#673ec8] rounded-md'>Random Preson 5</div>
                        <div className=' p-2  bg-[#673ec8] rounded-md'>Random Preson 6</div>
                        <div className=' p-2  bg-[#673ec8] rounded-md'>Random Preson 7</div>
                        <div className=' p-2  bg-[#673ec8] rounded-md'>Random Preson 8</div>
                        <div className=' p-2  bg-[#673ec8] rounded-md'>Random Preson 9</div>
                        <div className=' p-2  bg-[#673ec8] rounded-md'>Random Preson 10</div>
                        <div className=' p-2  bg-[#673ec8] rounded-md'>Random Preson 11</div>
                        <div className=' p-2  bg-[#673ec8] rounded-md'>Random Preson 12</div>
                        <div className=' p-2  bg-[#673ec8] rounded-md'>Random Preson 13</div>
                        <div className=' p-2  bg-[#673ec8] rounded-md'>Random Preson 14</div>
                        <div className=' p-2  bg-[#673ec8] rounded-md'>Random Preson 15</div>
                        <div className=' p-2  bg-[#673ec8] rounded-md'>Random Preson 16</div>
                        <div className=' p-2  bg-[#673ec8] rounded-md'>Random Preson 17</div>
                        <div className=' p-2  bg-[#673ec8] rounded-md'>Random Preson 18</div>
                        <div className=' p-2  bg-[#673ec8] rounded-md'>Random Preson 19</div>
                        <div className=' p-2  bg-[#673ec8] rounded-md'>Random Preson 20</div>
                    </div>
                </div>
                
            )
        } */}
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