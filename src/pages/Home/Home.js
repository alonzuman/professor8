import React from 'react'
import './Home.css'
import SchoolsSwiper from './components/SchoolsSwiper'
import HomeHero from './components/HomeHero'
import HowItWorks from './components/HowItWorks'

const Home = () => {
  return (
    <div className='home_content__container' dir='rtl'>
      <HomeHero />
      <SchoolsSwiper />
      {/* <HowItWorks /> */}
    </div>
  )
}

export default Home
