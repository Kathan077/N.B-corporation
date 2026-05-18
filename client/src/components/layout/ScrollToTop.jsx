import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // Scroll using window.scrollTo for standard browsers
    window.scrollTo(0, 0);
    
    // If Lenis smooth scrolling is active, reset its scroll position instantly
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null;
}

export default ScrollToTop;
