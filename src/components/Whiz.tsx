import React, { useEffect, useState, useRef } from 'react';  // Importing useRef and useEffect

const skills = [
  { name: 'Solidity', level: 5, class: 'devicon-solidity-plain colored'},
  { name: 'Node', level: 5, class: 'devicon-nodejs-plain colored' },
  { name: 'Python', level: 4, class: 'devicon-python-plain colored' },
  { name: 'Go', level: 3, class: 'devicon-go-original-wordmark colored' },
  { name: 'Rust', level: 3, class: 'devicon-rust-line'},
  { name: 'Ethereum', level: 5, path: '/img/ethereum.png'},
  { name: 'Hyperledger', level: 4, path: '/img/hyperledger.png'},
  { name: 'EOS', level: 4, path: '/img/eos.png'},
  { name: 'Biance', level: 4, path: '/img/binance.png'},
  { name: 'Polygon', level: 4, class: 'devicon-polygon-plain colored'},
  { name: 'Truffle', level: 4, path: '/img/truffle.png'},
  { name: 'Hardhat', level: 4, path: '/img/hard-hat.png'},
  { name: 'Web3.js', level: 5, path: '/img/web3.png'},
  { name: 'Ether.js', level: 3, path: '/img/ethereum_1.png'},
  { name: 'MySQL', level: 5, class: 'devicon-mysql-original colored' },
  { name: 'PostgreSQL', level: 4, class: 'devicon-postgresql-plain colored' },
  { name: 'MongoDB', level: 4, class: 'devicon-mongodb-plain colored' },
  { name: 'IPFS', level: 4, path: '/img/ipfs.svg'},
  { name: 'Bitcoin', level: 4, path: '/img/bitcoin.png'},
  { name: 'Solana', level: 3, path: '/img/solana.png'},
  { name: 'DAO', level: 4, path: '/img/dao.png'},
  { name: 'Defi', level: 4, path: '/img/defi.png'},
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
            {skill.class ? <i className={`${skill.class} text-4xl sm:text-6xl`} /> : <img src={process.env.PUBLIC_URL + skill.path} alt={skill.name} className='w-[60px]' />}
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