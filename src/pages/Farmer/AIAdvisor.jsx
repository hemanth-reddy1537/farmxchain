import React, { useState } from "react";
import Farmerlayout from "../../Layouts/Farmerlayout";
import { analyzeCropImage } from "../../api/geminiApi";

const AIAdvisor = () => {
  const [preview, setPreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset UI and show local preview
    setPreview(URL.createObjectURL(file));
    setReport(null);
    setIsAnalyzing(true);

    try {
      // ✅ Call the real Gemini API
      const data = await analyzeCropImage(file);
      setReport(data);
    } catch (err) {
      setReport({
        condition: "Error",
        confidence: "N/A",
        advice: "The AI could not process this image. Please check your internet or API key."
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Farmerlayout>
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-black mb-8 dark:text-white">AI Crop Advisor</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT: Upload & Preview Area */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] shadow-sm border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center min-h-[400px]">
            {preview ? (
              <div className="relative w-full h-full group">
                <img src={preview} className="rounded-3xl w-full h-full object-cover max-h-[450px]" alt="Preview" />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center rounded-3xl">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-white font-bold animate-pulse">AI ANALYZING TISSUES...</p>
                    </div>
                  </div>
                )}
                <button 
                  onClick={() => setPreview(null)} 
                  className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label className="cursor-pointer text-center group">
                <input type="file" hidden onChange={handleFileChange} accept="image/*" />
                <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">📸</div>
                <p className="text-xl font-bold text-gray-700 dark:text-gray-300">Upload Photo</p>
                <p className="text-sm text-gray-400 mt-2">Identify diseases and get care tips instantly</p>
              </label>
            )}
          </div>

          {/* RIGHT: Dynamic Report Area */}
          <div className="flex flex-col gap-6">
            <div className={`p-10 rounded-[40px] h-full transition-all duration-500 ${report ? 'bg-green-50 dark:bg-green-900/20 border border-green-200' : 'bg-gray-50 dark:bg-gray-800 border border-gray-100'}`}>
              {report ? (
                <div className="animate-in slide-in-from-bottom-5 duration-700">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-black text-green-900 dark:text-green-400">AI Analysis Report</h2>
                    <span className="bg-green-600 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase">Result</span>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Diagnosis</p>
                      <p className="text-2xl font-black text-gray-900 dark:text-white uppercase">{report.condition}</p>
                    </div>

                    <div className="flex gap-10">
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Confidence</p>
                        <p className="text-xl font-black text-green-600">{report.confidence}</p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-green-200 dark:border-green-800">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Expert Advice</p>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium italic">
                        "{report.advice}"
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 opacity-50">
                  <div className="text-5xl mb-4">🤖</div>
                  <p className="font-bold">{isAnalyzing ? "Processing neural nodes..." : "Awaiting data input..."}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Farmerlayout>
  );
};

export default AIAdvisor;