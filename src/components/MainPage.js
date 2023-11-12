import React from 'react'
import VideoPlayer from './VideoPlayer'
import Options from './Options'
import Notifications from './Notifications'

const MainPage = () => {
  return (
    <>
        <div className='bg-[#353535] text-white h-screen flex flex-col

          '>
                <div className='w-[100vw] h-[100vh] bg-[#838383]'>
                    <VideoPlayer/>
                </div>
                <div className=' flex items-center justify-center fixed bottom-0 right-0 left-0'>
                    <Options>
                        <Notifications/>
                    </Options>
                </div>
        </div>
    </>
  )
}

export default MainPage