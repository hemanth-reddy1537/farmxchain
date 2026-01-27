// src/services/aiService.js

// Mock AI analysis - for development only
export const mockAnalyzeImage = (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate AI analysis based on file name or random factors
      const fileName = file.name.toLowerCase();
      
      let quality, rating, consumable;
      
      // Simple mock logic based on file name
      if (fileName.includes('fresh') || fileName.includes('good')) {
        quality = "Excellent";
        rating = 4.5;
        consumable = true;
      } else if (fileName.includes('ripe') || fileName.includes('average')) {
        quality = "Good";
        rating = 3.8;
        consumable = true;
      } else if (fileName.includes('rotten') || fileName.includes('bad')) {
        quality = "Poor";
        rating = 2.0;
        consumable = false;
      } else {
        // Random analysis for other images
        const random = Math.random();
        if (random > 0.7) {
          quality = "Excellent";
          rating = (4 + Math.random()).toFixed(1);
          consumable = true;
        } else if (random > 0.4) {
          quality = "Good";
          rating = (3 + Math.random()).toFixed(1);
          consumable = true;
        } else {
          quality = "Poor";
          rating = (1 + Math.random()).toFixed(1);
          consumable = false;
        }
      }
      
      resolve({
        quality,
        rating: parseFloat(rating),
        consumable,
        analysis: `This product appears to be in ${quality.toLowerCase()} condition.`,
        confidence: (80 + Math.random() * 20).toFixed(1)
      });
    }, 2000);
  });
};

// Real AI integration would go here
export const analyzeImageWithAI = async (file) => {
  // For now, we'll use the mock version
  return await mockAnalyzeImage(file);
};