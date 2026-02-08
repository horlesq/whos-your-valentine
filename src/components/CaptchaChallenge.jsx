import React, { useState, useEffect } from "react";
import { RefreshCw, Info, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const CaptchaChallenge = ({ onVerify, images, senderName }) => {
    const [selected, setSelected] = useState(new Set());
    const [error, setError] = useState(false);

    // Total 9 images, all should be "correct"
    const imageIndices = Array.from({ length: 9 }, (_, i) => i);

    const toggleSelection = (index) => {
        const newSelected = new Set(selected);
        if (newSelected.has(index)) {
            newSelected.delete(index);
        } else {
            newSelected.add(index);
        }
        setSelected(newSelected);
        setError(false);
    };

    const handleVerify = () => {
        if (selected.size === 9) {
            onVerify();
        } else {
            setError(true);
        }
    };

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-4 rounded-lg shadow-xl max-w-sm w-full border border-pink-200"
        >
            {/* Header */}
            <div
                className="bg-blue-500 text-white p-4 -mx-4 -mt-4 rounded-t-lg mb-2 flex justify-between items-start"
                style={{ backgroundColor: "#ff3366" }}
            >
                <div>
                    <h2 className="font-bold text-lg">
                        Select all images with
                    </h2>
                    <h1 className="font-bold text-2xl">
                        {senderName || "your valentine"}
                    </h1>
                    <p className="text-xs opacity-90 mt-1">
                        Click verify once there are none left.
                    </p>
                </div>
                <div className="bg-white/20 p-2 rounded">
                    {/* Seal Icon */}
                    <div className="w-14 h-14 bg-white/90 rounded flex items-center justify-center shadow-sm overflow-hidden">
                        <img
                            src="/seal.png"
                            alt="seal"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-1 mb-2">
                {imageIndices.map((index) => (
                    <div
                        key={index}
                        className="relative cursor-pointer aspect-square bg-gray-100 overflow-hidden"
                        onClick={() => toggleSelection(index)}
                    >
                        {/* User Photo */}
                        <img
                            src={images[index]}
                            alt="Valentine"
                            className={`w-full h-full object-cover transition-transform duration-200 ${selected.has(index) ? "scale-90" : "scale-100"}`}
                        />

                        {/* Selection Checkmark Overlay */}
                        {selected.has(index) && (
                            <div className="absolute top-1 left-1 w-6 h-6 bg-pink-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm z-10">
                                <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Footer / Controls */}
            <div className="flex justify-between items-center mt-4 text-gray-500">
                <div className="flex space-x-4">
                    <button className="hover:text-pink-600 transition-colors">
                        <RefreshCw size={20} />
                    </button>
                    <button className="hover:text-pink-600 transition-colors">
                        <Headphones size={20} />
                    </button>
                    <button className="hover:text-pink-600 transition-colors">
                        <Info size={20} />
                    </button>
                </div>

                <button
                    onClick={handleVerify}
                    className={`px-6 py-2 rounded bg-rose-500 hover:bg-pink-500 font-bold text-white transition-all transform active:scale-95 ${error ? "bg-red-500 animate-shake" : ""}`}
                >
                    VERIFY
                </button>
            </div>

            {error && (
                <p className="text-red-500 text-xs mt-2 text-center">
                    Please select all matching images.
                </p>
            )}
        </motion.div>
    );
};

export default CaptchaChallenge;
