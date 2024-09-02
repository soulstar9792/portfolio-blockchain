import React, { useEffect, useState, useRef } from 'react';

const sentences = [
  { text: "I am Soul Star, a dedicated software developer specializing in full-stack development.", delay: 0 },
  { text: "With expertise in JavaScript, React, and PHP, along with frameworks like Laravel and Next.js, I create engaging and high-quality digital solutions.", delay: 3000 },
  { text: "Committed to continuous learning and collaboration, I strive to build intuitive applications that resonate with users and meet project goals.", delay: 7500 },
  { text: "Explore my portfolio to see how I can help bring your vision to life.", delay: 12000 }
];

const Who: React.FC = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [paragraphVisible, setParagraphVisible] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const hoRef = useRef<HTMLDivElement>(null);
  const iRef = useRef<HTMLDivElement>(null);
  const amRef = useRef<HTMLDivElement>(null);
  const [animateEnabled, setAnimateEnabled] = useState(false);

  useEffect(() => {
    // Start the animation enable timer 5 seconds after the page loads
    const timer = setTimeout(() => {
      setAnimateEnabled(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          setAnimationStarted(true);
          setTimeout(() => setParagraphVisible(true), 1200); // Delay for paragraph to appear
        }, 500);
      }
    });
  };

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

  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll, { threshold: 0.1 });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="who" className="py-20 min-h-screen w-full">
      <h2 className="text-4xl sm:text-6xl text-center flex justify-center items-center mb-20">
        <span
          className={`w-[66px] sm:w-[100px] rounded-full cursor-pointer ${animationStarted ? 'animate-slide-in-left' : 'invisible'} transition-all duration-300`}
          onClick={() => handleAnimation(imgRef)}  ref={imgRef}
        >
          <img src={process.env.PUBLIC_URL + "/img/ring-1_2.png"} alt="logo" className="grow-shrink-1" />
        </span>
        <span onClick={() => handleAnimation(hoRef)} ref={hoRef} className={`z-10 transition-transform duration-1000 ${animationStarted ? 'animate-slide-in-left' : 'invisible'}`}>
          ho
        </span>
        <span onClick={() => handleAnimation(iRef)} ref={iRef} className={`transition-transform duration-1000 ${animationStarted ? 'animate-bounce' : 'invisible'}`}>
        &nbsp;I&nbsp;
        </span>
        <span onClick={() => handleAnimation(amRef)} ref={amRef} className={`transition-transform duration-1000 ${animationStarted ? 'animate-slide-in-right' : 'invisible'}`}>
          am
        </span>
      </h2>
      <div className='w-full grid xl:grid-cols-2 sm:grid-cols-1 gap-4 items-center'>
        <div className="px-5 xl:p-0 md:px-20 sm:px-10">
          {sentences.map((sentence, index) => (
            <p key={index} className={`mt-4 md:text-2xl sm:text-xl transition-opacity duration-1000` + ' c-h-' + String(index)}>
              &nbsp;{paragraphVisible && <TypingText text={sentence.text} delay={sentence.delay} />}
            </p>
          ))}
        </div>
        <div className={`w-full px-5 xl:p-0 md:px-20 sm:px-10`} style={{ height: 'fit-content' }}> 
          <div className={`w-full my-box-shadow  transition-transform duration-3000 clickable ${paragraphVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <img src={process.env.PUBLIC_URL + "/img/coding.gif"} alt="logo" className='w-full' />
          </div>
        </div>

      </div>
    </section>
  );
};

const TypingText = ({ text, delay }: { text: string; delay: number }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(() => text.substring(0, index + 1)); // Appending one character at a time
          index++;
        } else {
          clearInterval(interval); // Clear interval when done
        }
      }, 30); // Typing speed

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }, delay); // Delay before starting typing

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, [text, delay]); // Dependency on text and delay

  return <span className='typing-sentence'>{displayText}</span>;
};

export default Who;