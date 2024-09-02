import React, { useEffect, useState, useRef } from 'react';
import './styles.css';

interface Project {
  name: string;
  image: string;
  description: string;
  website?: string;
  source?: string;
}

const projects: Project[] = require('../constants/projects.json');

const ProjectsPerPage = 6; // Total items to be displayed per page (2 rows of 3 items each)

const Which: React.FC = () => {
  const [titleAnimationStart, setTitleAnimationStart] = useState(false);
  const [visibleItem, setVisibleItem] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const hichRef = useRef<HTMLDivElement>(null);
  const iRef = useRef<HTMLDivElement>(null);
  const builtRef = useRef<HTMLDivElement>(null);
  const [animateEnabled, setAnimateEnabled] = useState(false);

  const handleScroll = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTitleAnimationStart(true);
        setAnimateEnabled(false);

        setTimeout(() => {
          setAnimateEnabled(true);
        }, 500);

        let index = 0;
        const interval = setInterval(() => {
          if (index <= projects.length) {
            setVisibleItem(index++);
          } else {
            clearInterval(interval);
          }
        }, 500);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll, { threshold: 0.1 });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        let current = sectionRef.current;
        observer.unobserve(current);
      }
    };
  }, []);

  const handleAnimation = (ref: React.RefObject<HTMLSpanElement>) => {
    if (animateEnabled && ref.current) {
      if (ref.current.classList.contains('animate-yesIm')) {
        return;
      }
      
      const classes = Array.from(ref.current.classList);
      classes.forEach(cls => {
        if (cls.startsWith('animate') && ref.current) {
          ref.current.classList.remove(cls);
        }
      });
      ref.current.classList.add('animate-yesIm');

      setTimeout(() => {
        ref.current?.classList.remove('animate-yesIm');
      }, 1000);
    }
  };

  // Calculate current projects to display based on current page
  const startIndex = currentPage * ProjectsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + ProjectsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Render pagination buttons
  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(projects.length / ProjectsPerPage);
    return (
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-800 ${currentPage === index ? 'bg-gray-700 text-white' : 'bg-gray-900'} transition duration-300 ${visibleItem >= ProjectsPerPage ? 'animate-fade-in' : 'opacity-0'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  return (
    <section ref={sectionRef} id="which" className="w-full py-20 min-h-screen">
      <h2 className="text-4xl sm:text-6xl text-center flex justify-center items-center mb-20">
        <div
          className={`w-[66px] sm:w-[100px] rounded-full cursor-pointer ${titleAnimationStart ? 'animate-slide-in-left' : 'invisible'} transition-all duration-300`}
          onClick={() => handleAnimation(imgRef)}  ref={imgRef}
        >
          <img src={process.env.PUBLIC_URL + "/img/ring-1_2.png"} alt="logo" className="grow-shrink-1" />
        </div>
        <span onClick={() => handleAnimation(hichRef)} ref={hichRef} className={`z-10 transition-transform duration-1000 ${titleAnimationStart ? 'animate-slide-in-left' : 'invisible'}`}>
          hich
        </span>
        <span onClick={() => handleAnimation(iRef)} ref={iRef} className={`transition-transform duration-1000 ${titleAnimationStart ? 'animate-bounce' : 'invisible'}`}>
           I 
        </span>
        <span onClick={() => handleAnimation(builtRef)} ref={builtRef} className={`transition-transform duration-1000 ${titleAnimationStart ? 'animate-slide-in-right' : 'invisible'}`}>
          Built
        </span>
      </h2>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 my-built px-5 xl:p-0 md:px-20 sm:px-10">
        {currentProjects.map((project, index) => (
          <div key={project.name} className={`relative bg-gray-800 hover:bg-gray-700 transition duration-1000 my-box-shadow clickable hover-contain  ${visibleItem > index? 'opacity-100 animate-slide-in' : 'opacity-0'}`}>
            <img src={process.env.PUBLIC_URL + project.image} alt={project.name} className="w-full h-auto" />
            <div className="absolute flex flex-col items-center justify-center bg-gray-900 opacity-100 transition duration-1000 hover-cover text-2xl">
              <p>{project.description}</p><br></br>
              <div className="flex space-x-2">
                {project.website && <a href={project.website} target='_blank' rel="noopener noreferrer" className="text-blue-400 hover:-mt-1 hover:mb-1 hover:underline">🌐</a>}
                {/* {project.source && <a href={project.source} target='_blank' rel="noopener noreferrer" className="text-green-400 hover:-mt-1 hover:underline">💻</a>} */}
              </div>
            </div>
          </div>
        ))}
      </div>
      {renderPaginationButtons()}
    </section>
  );
};

export default Which;