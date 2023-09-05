import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <section className='bg-red-10 items-center'>
    <p className="mx-auto w-6 items-center  bg-red-20 mt-20  text-[#94a684]   bg-red-20 my-auto">
        <Link to={"/"}>
          <AiFillHome size={40} />
        </Link>
      </p>
    </section>
  )
}

export default Header