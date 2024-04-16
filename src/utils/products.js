import axiosInstance from "../utils/axiosInstance"
export async function consultarProductos() {
  const { data } = await axiosInstance.get(`/products/view-products/`)
  return data
}

export async function consultarDetalles() {
  const { data } = await axiosInstance.get(`/products/view-details/`)
  return data
}

export async function consultarImagenes() {
  const { data } = await axiosInstance.get(`/products/view-products/`)
  return data
}
