import React from 'react'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
import Hero from '../Hero/Hero'
import BestSeller from './BestSeller'
import Banner from './Banner'

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
