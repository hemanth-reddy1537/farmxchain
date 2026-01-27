import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT;
// console.log(
//   "ENV CHECK:",
//   process.env.example.REACT_APP_GEMINI_API_KEY
// );

if (!API_KEY) {
  console.error("❌ Gemini API key is missing. Check your .env file.");
}
const genAI = new GoogleGenerativeAI(API_KEY);

async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

export const analyzeCropImage = async (file) => {
  console.log("DEBUG: analyzeCropImage called with file:", file.name);
  
  try {
    // Stage 1: Initialize model
    console.log("DEBUG: Initializing Gemini 1.5 Flash model...");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Stage 2: Prepare image data
    console.log("DEBUG: Converting file to base64...");
    const imagePart = await fileToGenerativePart(file);

    const prompt = `
      Analyze this image for a farmer. 
      1. If it is a plant/crop, identify if it is healthy or diseased.
      2. If diseased, identify the disease and provide specific treatment advice.
      3. If the image is NOT a plant (e.g., a person, a document, or an animal), return "Not a Crop".
      
      Respond STRICTLY in JSON format like this:
      {
        "condition": "Name of disease or Healthy",
        "confidence": "Percentage %",
        "advice": "Treatment steps or care instructions"
      }
    `;

    // Stage 3: Make the API call
    console.log("DEBUG: Sending request to Google Gemini API...");
    const result = await model.generateContent([prompt, imagePart]);
    
    console.log("DEBUG: API Response received. Awaiting response text...");
    const response = await result.response;
    const text = response.text();
    console.log("DEBUG: Raw AI Response Text:", text);

    // Stage 4: Parse JSON
    const cleanJson = text.replace(/```json|```/g, "").trim();
    const parsedData = JSON.parse(cleanJson);
    console.log("DEBUG: Successfully parsed JSON:", parsedData);
    
    return parsedData;

  } catch (error) {
    // Specific Error Catching
    console.error("CRITICAL ERROR in Gemini API call:");
    console.error("Error Name:", error.name);
    console.error("Error Message:", error.message);
    
    if (error.message.includes("400")) {
      console.warn("Possible issue: Malformed request or unsupported region.");
    } else if (error.message.includes("403")) {
      console.warn("Possible issue: Invalid API Key.");
    } else if (error.message.includes("429")) {
      console.warn("Possible issue: Quota exhausted (Rate limit hit).");
    }

    throw error; // Re-throw so UI can handle it
  }
};