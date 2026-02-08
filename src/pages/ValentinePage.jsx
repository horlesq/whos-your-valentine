import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CaptchaChallenge from "../components/CaptchaChallenge";
import SuccessScreen from "../components/SuccessScreen";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const ValentinePage = () => {
    const { id } = useParams();
    const [valentineData, setValentineData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const fetchValentine = async () => {
            try {
                const endpoint = `/.netlify/functions/get-valentine?id=${id}`;
                const response = await axios.get(endpoint);
                setValentineData(response.data);
            } catch (err) {
                console.error("Failed to fetch valentine:", err);
                setError("Valentine not found or link expired.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchValentine();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-pink-50">
                <Heart className="animate-pulse text-pink-500" size={48} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-pink-50 text-center p-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Oops! 💔
                    </h1>
                    <p className="text-gray-600">{error}</p>
                    <a
                        href="/"
                        className="inline-block mt-4 text-pink-600 hover:underline"
                    >
                        Create your own?
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-200 via-pink-300 to-rose-300 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                >
                    <pattern
                        id="heart-pattern"
                        x="0"
                        y="0"
                        width="50"
                        height="50"
                        patternUnits="userSpaceOnUse"
                    >
                        <text x="10" y="30" fontSize="20">
                            ❤️
                        </text>
                    </pattern>
                    <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="url(#heart-pattern)"
                    ></rect>
                </svg>
            </div>

            <AnimatePresence mode="wait">
                {!isVerified ? (
                    <motion.div
                        key="captcha"
                        exit={{ opacity: 0, y: -20 }}
                        className="z-10"
                    >
                        <CaptchaChallenge
                            onVerify={() => setIsVerified(true)}
                            images={valentineData.images}
                            senderName={valentineData.senderName}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        className="z-10 flex flex-col items-center justify-center w-full"
                    >
                        <SuccessScreen />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ValentinePage;
