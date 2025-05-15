import { useState, useEffect } from 'react';
import './ScrollButton.css'; // Make sure to add the CSS
import { FaAngleDoubleUp } from 'react-icons/fa';

function ScrollButton() {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    setShowButton(scrollY > 110);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button 
      className={`scroll-button ${showButton ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      {/* ↑ */}
      <FaAngleDoubleUp/>
    </button>
  );
}

// Add this component to your main layout or wherever needed

export default ScrollButton