import React from 'react'
import { Link } from 'react-router-dom'

const HomePageLogo = () => {
  return (
    <section className='text-center h-[274px]'>
      <h1 className='text-4xl my-20 font-bold text-[#94a684]'>Kan<span className='text-[#ba90c6]'>Ban</span> <span className='text-[#96b6c5]'>Board</span></h1>
      <Link to={'add/task'} className='mt20 px-20 py-2 rounded-lg text-[#e4e4d0] bg-[#94a684] font-bold ' >Create task</Link>
    </section>
  )
}

export default HomePageLogo