// En ./src/actions/index.ts
export { login, authenticate } from "./auth/login";
export { logout } from "./auth/logout";
export { registerUser } from "./auth/registerUser";

export { getPaginatedProductsWithImages } from "./products/product-pagination";
export { getProductBySlug } from "./products/get-product-by-slug";
export { getStockBySlug } from "./products/get-stock-by-slug";
