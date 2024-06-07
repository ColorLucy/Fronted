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

export async function patchOrder(id, order) {
  try {
    const { data } = await axiosInstance.patch(`/shopping/orders/${id}`, order);
    return data;
  } catch (error) {
    console.error(`Error updating order ${id}:`, error);
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

export async function getUserInfo(id) {
  try {
    const { data } = await axiosInstance.get(`/auth/user/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
  }
}
