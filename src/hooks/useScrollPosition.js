import { useEffect, useState } from 'react';

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(window.scrollY)

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  const scrollToTop = () => document.documentElement.scrollTop = 0

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollPosition, scrollToTop }
}

export default useScrollPosition;
