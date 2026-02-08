import React, { useState } from "react";
import axios from "axios";
import { readAndCompressImage } from "browser-image-resizer";
import { Copy, Check, Upload, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const imageConfig = {
    quality: 0.7,
    maxWidth: 300,
    maxHeight: 300,
    autoRotate: true,
    debug: false,
};

const CreatorPage = () => {
    const [images, setImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [generatedLink, setGeneratedLink] = useState(null);
    const [copySuccess, setCopySuccess] = useState(false);
    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);

        const remainingSlots = 9 - images.length;
        const filesToProcess = files.slice(0, remainingSlots);

        if (filesToProcess.length === 0) return;

        setIsUploading(true);
        try {
            const resizedImages = await Promise.all(
                filesToProcess.map(async (file) => {
                    let resizedImage = await readAndCompressImage(
                        file,
                        imageConfig,
                    );
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(resizedImage);
                        reader.onloadend = () => resolve(reader.result);
                    });
                }),
            );
            setImages((prev) => [...prev, ...resizedImages]);
        } catch (error) {
            console.error("Error resizing images:", error);
            alert("Failed to process one or more images. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (images.length !== 9) {
            alert("Please upload exactly 9 images.");
            return;
        }

        setIsUploading(true);
        try {
            const endpoint = "/.netlify/functions/create-valentine";

            const response = await axios.post(endpoint, {
                senderName: "Secret Admirer",
                images,
            });

            const { _id } = response.data;
            const link = `${window.location.origin}/v/${_id}`;
            setGeneratedLink(link);
        } catch (error) {
            console.error("Error creating valentine:", error);
            alert("Failed to create your valentine. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-rose-200 p-4 md:p-8 flex items-center justify-center font-[Outfit]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-white/50"
            >
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white text-center">
                    <h1 className="text-3xl font-bold font-['Great_Vibes']">
                        Create Your Valentine
                    </h1>
                    <p className="opacity-90 mt-2 text-sm">
                        Upload 9 photos to create a custom game for your love.
                    </p>
                </div>

                <div className="p-6 md:p-8 space-y-8">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700">
                                Upload 9 photos of yourself to create the game:
                                ({images.length}/9)
                            </label>
                            {images.length < 9 && (
                                <label className="cursor-pointer bg-pink-50 hover:bg-pink-100 text-pink-600 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                                    <Upload size={16} />
                                    Add Photos
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            {images.map((img, idx) => (
                                <div
                                    key={idx}
                                    className="relative aspect-square rounded-lg overflow-hidden group border border-gray-100"
                                >
                                    <img
                                        src={img}
                                        alt="preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={() => removeImage(idx)}
                                        className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                        >
                                            <path d="M18 6L6 18M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {Array.from({
                                length: Math.max(0, 9 - images.length),
                            }).map((_, i) => (
                                <div
                                    key={`empty-${i}`}
                                    className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300"
                                >
                                    <Heart size={24} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {generatedLink ? (
                        <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Sparkles size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">
                                    Your Valentine is Ready!
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Share this special link with your person.
                                </p>
                            </div>

                            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-2 pl-4">
                                <input
                                    readOnly
                                    value={generatedLink}
                                    className="flex-1 text-sm text-gray-600 outline-none bg-transparent"
                                />
                                <button
                                    onClick={copyToClipboard}
                                    className={`p-2 rounded-md transition-all ${copySuccess ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                                >
                                    {copySuccess ? (
                                        <Check size={18} />
                                    ) : (
                                        <Copy size={18} />
                                    )}
                                </button>
                            </div>

                            <a
                                href={generatedLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block text-sm text-pink-600 font-medium hover:underline decoration-pink-300 underline-offset-4"
                            >
                                Open Link to Test -&gt;
                            </a>
                        </div>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={images.length !== 9 || isUploading}
                            className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-pink-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-pink-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {isUploading ? (
                                <>Processing...</>
                            ) : (
                                <>
                                    Create Valentine{" "}
                                    <Heart size={20} fill="currentColor" />
                                </>
                            )}
                        </button>
                    )}

                    <p className="text-center text-xs text-gray-400 mt-4">
                        Privacy Note: Photos are automatically deleted after 6
                        hours.
                        <br />
                        The link will also expire in 6 hours.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default CreatorPage;
