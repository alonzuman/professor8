import React from 'react'
import ProfessorSvg from '../../../assets/svgs/Professor';
import useWindowSize from '../../../hooks/useWindowSize';
import ResultsSearchBar from '../../Results/components/ResultsSearchBar';
import './HomeHero.css'

const HomeHero = () => {
  const { windowWidth } = useWindowSize()

  return (
    <div className='hero__container'>
      {windowWidth <= 768 && <ResultsSearchBar customClassName='mobile_hero_search_bar' />}
      <ProfessorSvg className='hero_svg' />
    </div>
  )
}

export default HomeHero
