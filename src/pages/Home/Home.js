import React from 'react'
import './Home.css'
import SchoolsSwiper from './components/SchoolsSwiper'
import HomeHero from './components/HomeHero'
import HowItWorks from './components/HowItWorks'
import LatestReviews from './components/LatestReviews'

const Home = () => {
  return (
    <div className='home_content__container' dir='rtl'>
      <HomeHero />
      <SchoolsSwiper />
      <LatestReviews />
      {/* <HowItWorks /> */}
    </div>
  )
}

export default Home
