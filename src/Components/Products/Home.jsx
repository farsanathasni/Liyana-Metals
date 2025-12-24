import React from 'react'
// import About from '../../Pages/About'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
import Hero from '../Hero/Hero'
import Banner from '../Layout/Banner'
import BestSeller from './BestSeller'

function Home() {
  
  return (
    <div>
      <Navbar/>
      <Hero/>
      <BestSeller/>
      <Banner/>
      <Footer/>
    </div>
  )
}

export default Home
