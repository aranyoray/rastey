// utils/normalizationAlgorithm.js

export const normalizeData = (data, max, min) => {
    return data.map((item) => ({
      ...item,
      normalizedValue: (item.value - min) / (max - min),
    }));
  };