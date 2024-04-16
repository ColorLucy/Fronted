import axios from "axios";

const url = "http://127.0.0.1:8000/products/";

export async function consultarProductos(config) {
  try {
    const response = await axios.get(url + `view-products/`, config);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching products: ", error);
  }
}

export async function consultarDetalles(config) {
  try {
    const response = await axios.get(url + `view-details/`, config);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details: ", error);
  }
}

export async function consultarTrozosDetalles(config, page) {
  try {
    const response = await axios.get(
      url + `view-sliced-details/?page=${page}`,
      config
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details: ", error);
  }
}
