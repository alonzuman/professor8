import React from 'react'
import './Home.css'
import SchoolsSwiper from './components/SchoolsSwiper'
import HomeHero from './components/HomeHero'
import HowItWorks from './components/HowItWorks'
import AlertText from './AlertText'

const Home = () => {
  return (
    <div className='home_content__container' dir='rtl'>
      <AlertText />
      <HomeHero />
      <SchoolsSwiper />
      <HowItWorks />
    </div>
  )
}

export default Home
