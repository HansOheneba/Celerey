const STORAGE_KEY = 'form-storage';

/**
 * Get the form data from sessionStorage.
 * If no data is found, return the default value.
 */
export const getFormData = (defaultValue: object = {}) => {
  if (typeof window !== 'undefined') {
    const storedData = sessionStorage.getItem(STORAGE_KEY);
    if (storedData) {
      try {
        return JSON.parse(storedData);
      } catch (e) {
        console.error("Error parsing stored form data", e);
        return defaultValue;
      }
    }
  }
  return defaultValue;
};

/**
 * Set the form data to sessionStorage.
 * This method will overwrite any existing data.
 */
export const setFormData = (data: object) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

/**
 * Clear the form data from sessionStorage.
 */
export const clearFormData = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(STORAGE_KEY);
  }
};
