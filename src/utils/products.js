import axiosInstance from "../utils/axiosInstance";

export async function consultarProductos() {
  try {
    const { data } = await axiosInstance.get(`/products/view-products/`);
    // console.log(response);
    return data;
  } catch (error) {
    console.error("Error fetching products: ", error);
  }
}

export async function consultarDetalles() {
  try {
    const { data } = await axiosInstance.get(`/products/view-details/`);
    // console.log(response);
    return data;
  } catch (error) {
    console.error("Error fetching details: ", error);
  }
}

export async function consultarTrozosDetalles(page) {
  try {
    const { data } = await axiosInstance.get(
      `/products/view-sliced-details/?page=${page}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching product details: ", error);
  }
}
