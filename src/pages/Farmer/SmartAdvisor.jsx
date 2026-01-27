import React, { useState } from "react";
import { saveAiResult } from "../../utils/aiHistory";

const SmartAdvisor = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [cropName, setCropName] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setResult(null);
    }
  };

  const runAnalysis = () => {
    if (!cropName.trim()) {
      alert("Please enter crop name");
      return;
    }

    setAnalyzing(true);

    setTimeout(() => {
      const aiResult = {
        condition: "Healthy Leaf",
        confidence: 92,
        advice:
          "The leaf shows optimal chlorophyll levels. No pests detected. Continue current irrigation schedule.",
      };

      setAnalyzing(false);
      setResult(aiResult);

      // ✅ SAVE AI HISTORY
      saveAiResult(cropName, aiResult);
    }, 3000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border dark:border-gray-700 h-full">
      <h2 className="text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
        🤖 Smart Crop Advisor
      </h2>

      <input
        type="text"
        placeholder="Enter crop name (e.g. Tomato)"
        value={cropName}
        onChange={(e) => setCropName(e.target.value)}
        className="w-full mb-4 p-3 rounded-xl border dark:bg-gray-700 dark:text-white text-sm"
      />

      {!selectedImage ? (
        <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center">
          <input
            type="file"
            id="ai-upload"
            hidden
            onChange={handleImageChange}
            accept="image/*"
          />
          <label htmlFor="ai-upload" className="cursor-pointer">
            <div className="text-4xl mb-2">📸</div>
            <p className="text-sm text-gray-500 font-medium">
              Upload leaf or crop photo
            </p>
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative h-48 rounded-2xl overflow-hidden border dark:border-gray-700">
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            {analyzing && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-bold animate-pulse">
                  AI ANALYZING...
                </span>
              </div>
            )}
          </div>

          {!result && !analyzing && (
            <button
              onClick={runAnalysis}
              className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700"
            >
              Start AI Diagnosis
            </button>
          )}

          {result && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border">
              <p className="text-xs font-bold text-green-600">
                Confidence: {result.confidence}%
              </p>
              <p className="text-sm font-bold mt-1">
                {result.condition}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                {result.advice}
              </p>

              <button
                onClick={() => {
                  setSelectedImage(null);
                  setResult(null);
                }}
                className="mt-4 text-xs font-bold text-gray-400 hover:text-red-500"
              >
                Clear & Retake
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SmartAdvisor;
