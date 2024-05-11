import axios from "axios";
import axiosInstance from "./axiosInstance";


// GET

export async function getInfoBarInfo() {
  try {
    const { data } = await axiosInstance.get(`/info/api/infobar/`);
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching InfoBar info: ", error);
  }
}

export async function getHomeInfo() {
  try {
    const { data } = await axiosInstance.get(`/info/api/home/text/`);
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching Home text info: ", error);
  }
}

export async function getStartImages() {
  try {
    const { data } = await axiosInstance.get(`/info/api/home/start/`);
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching Start images: ", error);
  }
}

export async function getCombinationsImages() {
  try {
    const { data } = await axiosInstance.get(`/info/api/home/combinations/`);
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching Combinations images: ", error);
  }
}

export async function getProductsImages() {
  try {
    const { data } = await axiosInstance.get(`/info/api/home/products/`);
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching Products info: ", error);
  }
}

export async function getAlliesImages() {
  try {
    const { data } = await axiosInstance.get(`/info/api/home/allies/`);
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching Allies info: ", error);
  }
}

// PUT - PATCH

/**
 * Patch Request to Update Home Text
 * @param {Number} id
 * @param {Object} data
 * @returns {AxiosResponse}
 */
export async function updateHomeText(id, data) {
  try {
    const { response } = await axiosInstance.patch(
      `/info/api/home/text/${id}/`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error Updating Home Start Text: ", error);
  }
}

export async function updateStartImage(id, data) {
  try {
    const { response } = await axiosInstance.patch(
      `/info/api/home/start/${id}/`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error Updating Home Start Image: ", error);
  }
}

export async function updateCombinationsImage(id, data) {
  try {
    const { response } = await axios.patch(
      `/info/api/home/combinations/${id}/`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error Updating Home Start Image: ", error);
  }
}

export async function updateProductsImage(id, data) {
  try {
    const { response } = await axiosInstance.patch(
      `/info/api/home/products/${id}/`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error Updating Home Start Image: ", error);
  }
}

export async function updateAlliesImage(id, data) {
  try {
    const { response } = await axiosInstance.patch(
      `/info/api/home/allies/${id}/`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error Updating Home Start Image: ", error);
  }
}
