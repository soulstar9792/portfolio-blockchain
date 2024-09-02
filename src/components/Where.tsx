import React, { useEffect, useState, useRef } from 'react';

const Where: React.FC = () => {
  // State to manage visibility of the links
  const [telegramVisible, setTelegramVisible] = useState(false);
  const [discordVisible, setDiscordVisible] = useState(false);
  const [emailVisible, setEmailVisible] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  const handleScroll = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Start title animations
        setTelegramVisible(true);
        setTimeout(() => setDiscordVisible(true), 250);
        setTimeout(() => setEmailVisible(true), 500);
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
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="where" className="w-full py-20">
      <div className="flex justify-center space-x-4">
        <a href="https://t.me/secondstar9792" rel="noreferrer" target='_blank' className={`text-blue-400 transition-all duration-300 animate-pulse ${telegramVisible ? 'opacity-100' : 'opacity-0'}`}><img src={process.env.PUBLIC_URL + '/img/telegram.png'} alt='telegram' className='w-10 h-10 rounded-full'/></a>
        <a href="https://discord.com/users/1264648447785566281" rel="noreferrer" target='_blank' className={`text-blue-400 transition-all duration-300 ${discordVisible ? 'opacity-100 animate-pulse ' : 'opacity-0'}`}><img src={process.env.PUBLIC_URL + '/img/discord.png'} alt='discord' className='w-10 h-10 rounded-full'/></a>
        <a href="mailto:secondstar9792@gmail.com" rel="noreferrer" target='_blank' className={`text-blue-400 transition-all duration-300 ${emailVisible ? 'opacity-100 animate-pulse ' : 'opacity-0'}`}><img src={process.env.PUBLIC_URL + '/img/gmail.png'} alt='gmail' className='w-10 h-10 rounded-full'/></a>
      </div>
    </section>
  );
};

export default Where;