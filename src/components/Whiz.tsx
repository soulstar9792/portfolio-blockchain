import React, { useEffect, useState, useRef } from 'react';  // Importing useRef and useEffect

const skills = [
  { name: 'JavaScript', level: 5, class: 'devicon-javascript-plain colored'},
  { name: 'HTML', level: 5, class: 'devicon-html5-plain colored' },
  { name: 'Bootstrap', level: 5, class: 'devicon-bootstrap-plain colored'},
  { name: 'jQuery', level: 5, class: 'devicon-jquery-plain colored'},
  { name: 'React', level: 5, class: 'devicon-react-original colored'},
  { name: 'Angular JS', level: 3, class: 'devicon-angularjs-plain colored' },
  { name: 'Vue.js', level: 3, class: 'devicon-vuejs-plain colored' },
  { name: 'Next.js', level: 3, class: 'devicon-nextjs-line' },
  { name: 'PHP', level: 3, class: 'devicon-php-plain colored' },
  { name: 'Laravel', level: 3, class: 'devicon-laravel-original colored' },
  { name: 'Node', level: 3, class: 'devicon-nodejs-plain colored' },
  { name: 'Express', level: 3, class: 'devicon-express-original colored' },
  { name: 'Python', level: 3, class: 'devicon-python-plain colored' },
  { name: 'Django', level: 3, class: 'devicon-django-plain colored' },
  { name: 'MySQL', level: 3, class: 'devicon-mysql-original colored' },
  { name: 'PostgreSQL', level: 3, class: 'devicon-postgresql-plain colored' },
  { name: 'MongoDB', level: 3, class: 'devicon-mongodb-plain colored' },
  { name: 'Git', level: 3, class: 'devicon-git-plain colored' },
  { name: 'AWS', level: 3, class: 'devicon-amazonwebservices-plain-wordmark colored' },
  { name: 'Docker', level: 3, class: 'devicon-docker-plain colored' },
  { name: 'Apache', level: 3, class: 'devicon-apache-plain colored' },
  // Add your remaining skills here...
];

const Whiz: React.FC = () => {
  const [titleAnimationStart, setTitleAnimationStart] = useState(false); // State for title animation
  const [visibleItem, setVisibleItem] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null); // Ref for the section
  const imgRef = useRef<HTMLDivElement>(null);
  const hizRef = useRef<HTMLDivElement>(null);
  const iRef = useRef<HTMLDivElement>(null);
  const amRef = useRef<HTMLDivElement>(null);
  const [animateEnabled, setAnimateEnabled] = useState(false);

  const handleScroll = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTitleAnimationStart(true); // Start title animations when section is in view
        setAnimateEnabled(false);

        setTimeout(() => {
          setAnimateEnabled(true);
        }, 1000); // Initial delay before starting link animations
        
        let index = 0;
        const interval = setInterval(() => {
          if (index <= skills.length) {
            setVisibleItem(index++);
        } else {
            clearInterval(interval); // Clear interval when done
          }
        }, 300);
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
    <section ref={sectionRef} id="whiz" className="w-full py-20">
      {/* Animated Header */}
      <h2 className="text-4xl sm:text-6xl text-center flex justify-center items-center mb-20">
      <div
          className={`w-[66px] sm:w-[100px] rounded-full cursor-pointer ${titleAnimationStart ? 'animate-slide-in-left' : 'invisible'} transition-all duration-300`}
          onClick={() => handleAnimation(imgRef)}  ref={imgRef}
        >
          <img src={process.env.PUBLIC_URL + "/img/ring-1_2.png"} alt="logo" className="grow-shrink-1" />
        </div>
        <span onClick={() => handleAnimation(hizRef)} ref={hizRef} className={`z-10 transition-transform duration-1000 ${titleAnimationStart ? 'animate-slide-in-left' : 'invisible'}`}>
          hiz
        </span>
        <span onClick={() => handleAnimation(iRef)} ref={iRef} className={`transition-transform duration-1000 ${titleAnimationStart ? 'animate-bounce' : 'invisible'}`}>
           I 
        </span>
        <span onClick={() => handleAnimation(amRef)} ref={amRef} className={`transition-transform duration-1000 ${titleAnimationStart ? 'animate-slide-in-right' : 'invisible'}`}>
          am
        </span>
      </h2>
      {/* Skills Grid */}
      <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-3 gap-4 px-5 xl:p-0 md:px-20 sm:px-10">
        {skills.map((skill, index) => (
          <div key={skill.name} className={`flex flex-col items-center text-md sm:text-2xl p-2 sm:p-5 skill-item transition duration-1000 ${visibleItem > index? 'opacity-100' : 'opacity-0'}`}>
            <div>{skill.name}</div>
            <i className={`${skill.class} text-4xl sm:text-6xl`} />
            {/* You can add icons for other skills here */}
            <div>
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index} className={`text-${index < skill.level ? 'yellow' : 'gray'}-500`}>★</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Whiz;