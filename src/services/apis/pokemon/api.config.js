const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION;

export const API_CONFIG = {
    BASE_URL: `${BASE_API_URL}${API_VERSION}`
};
