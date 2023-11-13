import React, { useContext, useEffect } from 'react'
import { SocketContext } from './SocketContext'

const Random = () => {
    
    const {callAccepted,stream,All_Onlines,Me,CallUser} = useContext(SocketContext);
    useEffect(()=>{
        console.log(All_Onlines)
    },[All_Onlines])
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0
        flex items-center justify-center flex-col gap-11
    '>
        {
        (stream && !callAccepted) && (
                <>
                    <div className=' h-[45vh] overflow-y-auto
                    flex-col gap-7 flex justify-center w-[60vw]
                    items-center'>
                        <div className=' flex flex-wrap gap-7 scrollable-container 
                        justify-center items-center pt-10 pb-10 pr-4 pl-4
                        '>
                            {
                                All_Onlines.map((ele , index)=>{
                                    return(
                                        ((Me !== ele) && 
                                            <div
                                             onClick={()=>CallUser(ele)}
                                                    className 
                                                    =' p-2  bg-[#673ec8] rounded-md
                                                    hover:cursor-pointer'>
                                                        {/* Random Preson {index+1} */}
                                                        {ele}
                                            </div>
                                        )
                                    )
                                })
                            }
                        </div>
                    </div>
                    <button className=' p-3 bg-fuchsia-700 rounded-md font-thin'>
                            Pick Random
                     </button>
                    
                </>
            )
        }
    </div>
        
  )
}

export default Random