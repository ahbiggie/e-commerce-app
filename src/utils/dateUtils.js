// src/utils/dateUtils.js

/**
 * Returns the current date formatted as "Day Month Year" (e.g., "24 March 2024").
 * @returns {string} The formatted current date string.
 */
export const getCurrentDate = () => {
    const date = new Date();
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
};