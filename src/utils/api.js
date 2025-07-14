// src/utils/api.js

import products from "../data/products" // Import your mock product data

/**
 * Simulates fetching all products from a backend API.
 * @returns {Promise<Array>} A promise that resolves with an array of products.
 */
export const fetchProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 500) // Simulate network delay of 500ms
    })
}

/**
 * Simulates fetching a single product by its ID from a backend API.
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise<Object|null>} A promise that resolves with the product object, or null if not found.
 */
export const fetchProductById = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const product = products.find((p) => p.id === parseInt(id))
            resolve(product)
        }, 500) // Simulate network delay of 500ms
    })
}