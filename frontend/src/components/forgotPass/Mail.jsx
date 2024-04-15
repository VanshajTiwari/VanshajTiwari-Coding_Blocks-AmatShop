import React from 'react'
import { ArrowRight } from 'lucide-react'

const Mail = () => {
  return (
    <div className='px-[35%] py-[5.5%]'>
      <div className='bg-white py-5 rounded-md border-double border-4 border-black'>
        <h1 className='text-center mb-5 font-bold text-xl'>Forgot Password</h1>
        <form action="">
          <input
            className="flex h-10 m-auto mb-4 rounded-md border border-black/30 bg-white w-[70%] px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="email"
            placeholder="Enter Your Email"
            required
          ></input>
          <button
            type="Submit"
            className="flex  m-auto text-md items-center rounded-md bg-black px-10 py-2 font-semibold text-white hover:bg-black/80"
          >
            Submit
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Mail
