export const setItem = (key, value) => window.localStorage.setItem(key, typeof value !== 'string' ? JSON.stringify(value) : value);
export const getItem = key => window.localStorage.getItem(key);
export const removeItem = key => window.localStorage.removeItem(key);
