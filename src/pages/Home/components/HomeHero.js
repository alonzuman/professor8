import { Button, Typography } from '@material-ui/core';
import React from 'react'
import ProfessorSvg from '../../../assets/svgs/Professor';
import useWindowSize from '../../../hooks/useWindowSize';
import heb from '../../../utils/translation/heb';
import ResultsSearchBar from '../../Results/components/ResultsSearchBar';
import './HomeHero.css'

const HomeHero = () => {
  const { windowWidth } = useWindowSize()

  return (
    <div className='hero__container'>
      <div className='hero__actions_container'>
        {windowWidth <= 768 && <ResultsSearchBar customClassName='mobile_hero_search_bar' />}
        <div className='hero__slogan'>
          <Typography className='mt-2' variant='h1'>{heb.heroSlogan}</Typography>
          <Button className='mt-2' variant='contained' color='secondary'>{heb.latestProfessors}</Button>
        </div>
      </div>
      <ProfessorSvg className='hero_svg' />
    </div>
  )
}

export default HomeHero
