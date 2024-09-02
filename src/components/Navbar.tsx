import React, { useState, useRef, useEffect } from 'react';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const textRef = useRef<HTMLDivElement | null>(null);
    const [textWidth, setTextWidth] = useState(0);

    const handleImageClick = () => {
        isOpen && window.scrollTo(0, 0);
        setIsOpen((prev) => !prev); // Toggle open/close state
    };

    const handleLinkClick = () => {
        setIsOpen(false); // Close on link click
    };

    // Effect to update text width when isOpen state changes
    useEffect(() => {
        if (textRef.current) {
            setTextWidth(textRef.current.scrollWidth); // Get the dynamic width of text container
        }
    }, [isOpen]);

    return (
        <nav className={`fixed bottom-[10px] left-1/2 transform -translate-x-1/2 bg-transparent flex flex-col items-center z-20 min-w-max transition-all duration-300`}>
            <div 
                className={`text-xl font-bold w-12 h-12 rounded-full cursor-pointer transition-all duration-300 ${isOpen ? 'mb-[65px]' : 'mb-0'}`}
                onClick={handleImageClick}
            >
                <img src={process.env.PUBLIC_URL + "/img/ring-1_2.png"} alt="logo" className="grow-shrink-1" />
            </div>
            {/* Hidden by default, appears above the navbar */}
            <div 
                ref={textRef} 
                className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-4 opacity-0'}`}
                style={{
                    width: `${textWidth}px`,
                    visibility: isOpen ? 'visible' : 'hidden', // Control visibility
                    bottom: `${isOpen ? '30' : '-40'}px`, // Keep it positioned just under the image
                    whiteSpace: 'nowrap', // Prevent wrapping for a cleaner look
                }}
            >
                {['Who', 'What', 'Which', 'Whiz', 'Where'].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300"
                        onClick={handleLinkClick}
                    >
                        {item}
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;