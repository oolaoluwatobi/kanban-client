import React from 'react'
import { Link } from 'react-router-dom'

const HomePageLogo = () => {
  return (
    <section className='text-center h-[274px]'>
      <h1 className='text-4xl mb-20'>KanBan Board</h1>
      <Link to={'add/task'} className='mt20 bg-slate-400 px-5 py-2 rounded-lg text-white hover:underline' >Create task</Link>
    </section>
  )
}

export default HomePageLogo