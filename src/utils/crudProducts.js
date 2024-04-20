import axiosInstance from "../utils/axiosInstance";

export async function getProduct(id_product) {
    try {
        const { data }  = await axiosInstance.get(`/products/view-product/?pk=${id_product}`);
        return data
    } catch (error) {
        console.error("Error fetching product data:", error);
    }
};

export async function postProduct(data) {
    try {
        const { response }  =  await axiosInstance.post(`/products/create-product/`, data);
        console.log(response)
        return data
    } catch (error) {
        console.error("Error creating product data:", error);
    }
};

export async function updateProduct(productId, data) {
    try {
        const { response }  =  await axiosInstance.put(`/products/update-product/?pk=${productId}`, data);
        return response
    } catch (error) {
        console.error("Error updating product data:", error);
    }
};

export async function deleteProduct(productId) {
    try {
        const { response }  =  await axiosInstance.delete(`/products/delete-product/?pk=${productId}`);
        return response
    } catch (error) {
        console.error("Error deleting product:", error);
    }
};

export async function getCategories() { 
    try {
        const { data } = await axiosInstance.get(`/products/view-categories/`);
        return data;
    } catch (error) {
        console.error("Eggor getting categories:", error)
    }
};