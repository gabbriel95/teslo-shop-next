// En ./src/actions/index.ts
export { setUserAddress } from "./address/set-user-address";
export { deleteUserAddress } from "./address/delete-user-address";
export { getUserAddress } from "./address/get-user-address";

export { placeOrder } from "./order/place-order";
export { getOrderBySessionUser } from "./order/get-orders-by-user";
export { getOrderById } from "./order/get-order-by-id";

export { setTransactionId } from "./payments/setTransactionId";
export { paypalCheckPayment } from "./payments/paypal-check-payment";

export { login, authenticate } from "./auth/login";
export { logout } from "./auth/logout";
export { registerUser } from "./auth/registerUser";

export { getCountries } from "./country/get-countries";

export { getPaginatedProductsWithImages } from "./products/product-pagination";
export { getProductBySlug } from "./products/get-product-by-slug";
export { getStockBySlug } from "./products/get-stock-by-slug";

export { paymentMercadoPago } from "./payments/payment-mercado-pago";
