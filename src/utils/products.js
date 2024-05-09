import axiosInstance from "../utils/axiosInstance";

export async function consultarProductos() {
  try {
    const { data } = await axiosInstance.get(`/products/view-products/`);
    return data;
  } catch (error) {
    console.error("Error fetching products: ", error);
  }
}