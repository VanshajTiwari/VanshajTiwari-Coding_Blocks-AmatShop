import React from 'react'
import {Link} from 'react-router-dom'

const Profile = () => {
  const user = [
    {
      name: "Kushagra Garg",
      email: "kushagra@shopkart.com",
      img: "https://cdn-icons-png.flaticon.com/512/3641/3641963.png"
    }
  ]
  return (
    <div className=''>
      <div className='flex flex-wrap justify-center my-5 p-3 items-center'>
        <div className=''>
          <img
            className='rounded-full h-40 bg-black mx-[5vw]'
            src={user[0].img} alt="Avatar" />
        </div>
        <div className='bg-white px-10 py-7 rounded-lg'>
          <form action="">
            <div className='my-2'>
              <label htmlFor="name" className='font-semibold my-2'>UserName: </label>
              <input type="text"
                className='block my-2 px-4 py-2 bg-[lightgrey] focus:outline-none'
                id="name"
                value={user[0].name}
                readOnly />
            </div>
            <div className='my-3'>
              <label htmlFor="email" className='font-semibold'>Registered Email:</label>
              <input type="email"
                className='block my-2 px-4 py-2 bg-[lightgrey] focus:outline-none'
                id="email"
                value={user[0].email}
                readOnly />
            </div>
          </form>
          <div className='w-full text-center'>
            <Link to='/Order'>
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
            >
              Your Orders
            </button>
            </Link>
          </div> 
          <div className='w-full text-center my-3'>
            <Link to='/ForgetPass'>
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
            >
              Change Password
            </button>
            </Link>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default Profile
