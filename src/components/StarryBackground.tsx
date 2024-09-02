import React, { useEffect, useRef } from 'react';

// Define a type for our star
interface Star {
    x: number;
    y: number;
    radius: number;
    alpha: number;
    targetRadius?: number;
    targetAlpha?: number;
    speedX?: number;
    speedY?: number;
}

const StarryBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const hoverPosition = useRef<{ x: number; y: number } | null>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        let stars: Star[] = [];
        const initialStarCount: number = 100;
        const maxStars = 200;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const generateStar = (x: number, y: number) => {
            const radius = Math.random() * 2 + 0.5;
            const alpha = Math.random() * 0.5 + 0.5;
            const speedX = (Math.random() - 0.5) * 0.5;
            const speedY = (Math.random() - 0.5) * 0.5;
            
            stars.push({
                x,
                y,
                radius,
                alpha,
                targetRadius: radius,
                targetAlpha: alpha,
                speedX,
                speedY,
            });
        };

        const generateInitialStars = () => {
            for (let i = 0; i < initialStarCount; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                generateStar(x, y);
            }
        };

        const drawStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.fill();
                ctx.closePath();
            });
        };

        const updateStars = () => {
            stars.forEach(star => {
                star.radius += (star.targetRadius! - star.radius) * 0.1;
                star.alpha += (star.targetAlpha! - star.alpha) * 0.1;

                if (Math.random() < 0.01) {
                    star.targetRadius = Math.random() * 2 + 0.5;
                    star.targetAlpha = Math.random() * 0.5 + 0.5;
                }

                // Update star positions
                star.x += star.speedX!;
                star.y += star.speedY!;

                if (star.x < 0) star.x = 0;
                if (star.x > canvas.width) star.x = canvas.width;
                if (star.y < 0) star.y = 0;
                if (star.y > canvas.height) star.y = canvas.height;
            });

            if (stars.length > maxStars) {
                stars.splice(0, stars.length - maxStars);
            }
        };

        const animateStars = () => {
            updateStars();
            drawStars();
            requestAnimationFrame(animateStars);
        };

        let lastScrollY = window.scrollY; // Keep track of the last scroll position

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollDirection = currentScrollY - lastScrollY; // Determine scroll direction
            
            const flowDistance = Math.abs(scrollDirection) / 1000; // Scale the flow distance based on scroll amount
            
            stars.forEach(star => {
                if (scrollDirection > 0) {
                    // Scrolling down: move stars up
                    star.y -= flowDistance; 
                } else {
                    // Scrolling up: move stars down
                    star.y += flowDistance; 
                }

                // Wrap around logic
                if (star.y < 0) {
                    star.y = canvas.height; // Reset to the bottom of the canvas
                    star.x = Math.random() * canvas.width; // Randomize x position
                } else if (star.y > canvas.height) {
                    star.y = 0; // Reset to the top of the canvas
                    star.x = Math.random() * canvas.width; // Randomize x position
                }
            });

            lastScrollY = currentScrollY; // Update last scroll position
        };

        const handleClick = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            generateStar(clientX, clientY);
        };

        const handleMouseMove = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            hoverPosition.current = { x: clientX, y: clientY };
        };

        const updateStarsOnHover = () => {
            if (hoverPosition.current) {
                const { x, y } = hoverPosition.current;
                stars.forEach(star => {
                    const dx = star.x - x;
                    const dy = star.y - y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        star.targetAlpha = Math.min(1, star.alpha + 0.1);
                    }
                });
            }
        };

        resizeCanvas();
        generateInitialStars();
        animateStars();

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('click', handleClick);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        const renderLoop = () => {
            updateStarsOnHover();
            requestAnimationFrame(renderLoop);
        };
        renderLoop();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('click', handleClick);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'black', zIndex: -1 }}
        />
    );
};

export default StarryBackground;