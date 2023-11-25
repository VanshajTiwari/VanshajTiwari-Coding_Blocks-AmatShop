import Products from "../Products"
import "./Home.css"
import {Link} from 'react-router-dom'

function Home() {
  return (
    <>
      <div className="home">
       <Link to='/products'> <button className="bg-white text-black p-[15px] font-bold rounded-lg">Shop Now</button></Link>
      </div>
      <Products name={"Trending Items"}/>
    </>
  )
}

export default Home
