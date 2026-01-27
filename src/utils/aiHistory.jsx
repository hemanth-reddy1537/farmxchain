const STORAGE_KEY = "farmx_ai_history";

export const saveAiResult = (cropName, result) => {
  const history = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  history[cropName] = {
    ...result,
    savedAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const getAiHistory = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
};

export const getAiHistoryForCrop = (cropName) => {
  const history = getAiHistory();
  return history[cropName] || null;
};
