import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

const SuccessScreen = () => {
    useEffect(() => {
        // Trigger confetti on mount
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = {
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            zIndex: 0,
        };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: {
                        x: randomInRange(0.1, 0.3),
                        y: Math.random() - 0.2,
                    },
                }),
            );
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: {
                        x: randomInRange(0.7, 0.9),
                        y: Math.random() - 0.2,
                    },
                }),
            );
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-pink-300 max-w-2xl mx-4"
        >
            <h1
                className="text-5xl md:text-7xl font-bold text-pink-600 mb-6 drop-shadow-sm font-[cursive]"
                style={{ fontFamily: '"Great Vibes", cursive' }}
            >
                Happy Valentine's Day!
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 italic">
                You successfully passed the test! You know your valentine
            </p>
            <div className="flex justify-center gap-4">
                <span className="text-6xl animate-bounce delay-200">❤️</span>
            </div>
        </motion.div>
    );
};

export default SuccessScreen;
