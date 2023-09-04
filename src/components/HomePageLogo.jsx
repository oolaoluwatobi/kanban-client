import React from 'react'
import { Link } from 'react-router-dom'

const HomePageLogo = () => {
  return (
    <section className='text-center h-[274px]'>
      <h1 className='text-4xl my-20 font-bold text-[#94a684]'>Kan<span className='text-[#ba90c6]'>Ban</span> <span className='text-[#96b6c5]'>Board</span></h1>
      <Link to={'add/task'} className='mt20 px-20 py-2 roundedlg text-[#e4e4d0] bg-[#94a684]   opacity-80 hover:opacity-100  font-bold  rounded-full transition-transform transform hover:scale-105 shadow-md' >Create task</Link>
    </section>
  )
}

export default HomePageLogo