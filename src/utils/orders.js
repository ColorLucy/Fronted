import axiosInstance from "../utils/axiosInstance";

export async function getOrders() {
  try {
    const { data } = await axiosInstance.get(`/shopping/orders/`);
    return data;
  } catch (error) {
    console.error("Error fetching orders: ", error);
  }
}

export async function postOrder(order) {
  try {
    const { data } = await axiosInstance.post(`/shopping/orders/`, order);
    return data;
  } catch (error) {
    console.error("Error creating order: ", error);
  }
}

export async function getOrder(id) {
  try {
    const { data } = await axiosInstance.get(`/shopping/orders/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
  }
}
