import React, { useEffect, useState, useRef } from 'react';
import './styles.css'; // Ensure styles are properly loaded

const Welcome: React.FC = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [growShrinkStarted, setGrowShrinkStarted] = useState(false);
  const [sSAnimationStart, setSSAnimationStart] = useState(false);
  const [sSAnimationEnd, setSSAnimationEnd] = useState(false);
  const [paragraphVisible, setParagraphVisible] = useState(false);
  const [showSecondTypingText, setShowSecondTypingText] = useState(false);
  const [showThirdTypingText, setShowThirdTypingText] = useState(false);

  const elcomeRef = useRef<HTMLSpanElement>(null);
  const toRef = useRef<HTMLSpanElement>(null);
  const ssRef = useRef<HTMLSpanElement>(null);
  const _sRef = useRef<HTMLSpanElement>(null);
  const portfolioRef = useRef<HTMLSpanElement>(null);
  const exclamationRef = useRef<HTMLSpanElement>(null);
  const [animateEnabled, setAnimateEnabled] = useState(false);

  useEffect(() => {
    // Start the animation enable timer 5 seconds after the page loads
    const timer = setTimeout(() => {
      setAnimateEnabled(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setAnimationStarted(true);

      setTimeout(() => {
        setGrowShrinkStarted(true);
      }, 1000);

      setTimeout(() => {
        setParagraphVisible(true);
        setSSAnimationStart(true);
      }, 2000);
      setTimeout(() => {
        setSSAnimationEnd(true);
      }, 3000);
    }, 500);

    return () => {
      clearTimeout(timeout1);
    };
  }, []);

  useEffect(() => {
    if (paragraphVisible) {
      const timeout2 = setTimeout(() => {
        setShowSecondTypingText(true);
      }, 4000); // Show second text after 5 seconds

      return () => clearTimeout(timeout2);
    }
  }, [paragraphVisible]);

  useEffect(() => {
    if (showSecondTypingText) {
      const timeout3 = setTimeout(() => {
        setShowThirdTypingText(true);
      }, 3000); // Show third text after 4 seconds

      return () => clearTimeout(timeout3);
    }
  }, [showSecondTypingText]);

  const handleAnimation = (ref: React.RefObject<HTMLSpanElement>) => {
    if (animateEnabled && ref.current) {
      
      // Check if the animation class is already present
      if (ref.current.classList.contains('animate-yesIm')) {
        return; // If already animated, early return
      }

      const classes = Array.from(ref.current.classList); // Convert DOMTokenList to an array

      // Remove all animate classes
      classes.forEach(cls => {
        if (cls.startsWith('animate') && ref.current) {
          ref.current.classList.remove(cls);
        }
      });

      // Add the new animation class
      ref.current.classList.add('animate-yesIm');

      // Remove the animation class after it finishes to allow re-triggering
      setTimeout(() => {
        ref.current?.classList.remove('animate-yesIm');

      }, 1000); // Duration of the animation
    }
  };

  return (
    <section id="welcome" className="flex w-full min-h-screen py-20 flex-col items-center justify-evenly">
      <div className="relative w-full flex flex-col flex-wrap items-center">
        <h2 className="xl:text-8xl lg:text-6xl md:text-5xl sm:text-4xl text-4xl font-bold relative flex align-center justify-center flex-wrap items-center">
          <span
            onClick={() => handleAnimation(elcomeRef)}
            className={`${animationStarted ? 'animate-bounce' : 'invisible'} ${growShrinkStarted ? 'grow-shrink-1' : ''}`}
          >
            <div className="flex justify-center">
              <div className="bg-transparent xl:w-60 lg:w-40 md:w-32 sm:w-20 w-20  rounded-full animate-pulse">  
                <img src={process.env.PUBLIC_URL + "/img/ring-1_1.png"} alt="logo" />
              </div>
            </div>
          </span>
          <span
            ref={elcomeRef}
            onClick={() => handleAnimation(elcomeRef)}
            className={`transition-opacity duration-1000 ${animationStarted ? 'animate-slide-in' : 'invisible'}`}
          >
            elcome
          </span>
          <span
            ref={toRef}
            onClick={() => handleAnimation(toRef)}
            className={`transition-opacity duration-1000 ${growShrinkStarted ? "opacity-100" : "opacity-0"}`}
          >
            &nbsp;to&nbsp;
          </span>
          <span
            ref={ssRef}
            onClick={() => handleAnimation(ssRef)}
            className={`transition-all duration-1000 ${sSAnimationStart && !sSAnimationEnd ? 'animate-bounce' : (!sSAnimationEnd && 'invisible')} ${sSAnimationEnd ? ' animate-pulse' : ''}`}
            style={{ color: 'rgb(253,37,37)' }}
          >
            S.S
          </span>
          <span
            ref={_sRef}
            onClick={() => handleAnimation(_sRef)}
            className={`transition-opacity duration-1000 ${growShrinkStarted ? "opacity-100" : "opacity-0"}`}
          >'s&nbsp;
          </span>
          <span
            ref={portfolioRef}
            onClick={() => handleAnimation(portfolioRef)}
            className={`transition-opacity duration-1000 ${growShrinkStarted ? "opacity-100" : "opacity-0"}`}
          >
           Portfolio
          </span>
          <span
            ref={exclamationRef}
            onClick={() => handleAnimation(exclamationRef)}
            className={`transition-opacity duration-1000 ${growShrinkStarted ? "opacity-100" : "opacity-0"}`}
          >
            !
          </span>
        </h2>
      </div>
      <p className={`xl:text-4xl sm:text-2xl transition-opacity text-center duration-1000 ${paragraphVisible ? "opacity-100" : "opacity-0"}`}>
        &nbsp;{paragraphVisible && (
          <TypingText text="Full-stack developer with expertise in JS frameworks, especially React." />
        )}
      </p>
    </section>
  );
};

const TypingText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(() => text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [text]);

  // Split the displayText into words
  const words = displayText.split(' ');

  return (
    <span>
      {words.map((word, idx) => (
        <span key={idx} className="typing-text"> {/* Add margin for spacing */}
          &nbsp;{word}
        </span>
      ))}
    </span>
  );
};

export default Welcome;