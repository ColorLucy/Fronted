import axiosInstance from "./axiosInstance";

// GET

export async function getInfoBarInfo() {
  let dataInfo = {}
  const now = new Date().getTime();
  const infoData = localStorage.getItem('info_data');
  const storedTime = localStorage.getItem('info_data_time');
  const lastFetchTime = storedTime ? parseInt(storedTime, 10) : 0;
  if (infoData && (now - lastFetchTime) < 28800000) {
    dataInfo = JSON.parse(infoData);
  } else {
    await axiosInstance.get(`/info/api/infobar/`)
      .then(({ data }) => {
        localStorage.setItem('info_data', JSON.stringify(data));
        localStorage.setItem('info_data_time', now.toString());
        dataInfo = data
      })
      .catch((error) => {
        localStorage.removeItem("info_data")
        localStorage.removeItem("info_data_time")
        console.error("Error fetching InfoBar info: ", error);
      });
  }
  return dataInfo;
}

export async function getHomeInfo() {
  let dataInfo = {}
  const now = new Date().getTime();
  const homeData = localStorage.getItem('home_data');
  const storedTime = localStorage.getItem('home_data_time');
  const lastFetchTime = storedTime ? parseInt(storedTime, 10) : 0;
  if (homeData && (now - lastFetchTime) < 28800000) {
    dataInfo = JSON.parse(homeData);
  } else {
    await axiosInstance.get(`/info/api/home/text/`)
      .then(({ data }) => {
        localStorage.setItem('home_data', JSON.stringify(data));
        localStorage.setItem('home_data_time', now.toString());
        dataInfo = data
      })
      .catch((error) => {
        localStorage.removeItem("home_data")
        localStorage.removeItem("home_data_time")
        dataInfo = homeData ? JSON.parse(homeData): {};
      });
  }
  return dataInfo;
}

export async function getStartImages() {
  let dataInfo = []
  const now = new Date().getTime();
  const startImgs = localStorage.getItem('start_Imgs');
  const storedTime = localStorage.getItem('start_Imgs_time');
  const lastFetchTime = storedTime ? parseInt(storedTime, 10) : 0;
  if (startImgs && (now - lastFetchTime) < 28800000) {
    dataInfo = JSON.parse(startImgs);
  } else {
    await axiosInstance.get(`/info/api/home/start/`)
      .then(({ data }) => {
        localStorage.setItem('start_Imgs', JSON.stringify(data));
        localStorage.setItem('start_Imgs_time', now.toString());
        dataInfo = data
      })
      .catch((error) => {
        localStorage.removeItem("start_Imgs")
        localStorage.removeItem("start_Imgs_time")
        dataInfo = startImgs ? JSON.parse(startImgs): [];
      });
  }
  return dataInfo;
}

export async function getCombinationsImages() {
  try {
    const { data } = await axiosInstance.get(`/info/api/home/combinations/`);
    return data;
  } catch (error) {
    return []
  }
}

export async function getProductsImages() {
  try {
    const { data } = await axiosInstance.get(`/info/api/home/products/`);
    return data;
  } catch (error) {
    return []
  }
}

export async function getAlliesImages() {
  try {
    const { data } = await axiosInstance.get(`/info/api/home/allies/`);
    return data;
  } catch (error) {
    return []
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

export async function updateInfobar(id, data) {
  try {
    const { response } = await axiosInstance.patch(
      `/info/api/infobar/${id}/`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error Updating Infobar Text: ", error);
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
    const { response } = await axiosInstance.patch(
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
    console.error("Error Updating Home Combinations Image: ", error);
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
    console.error("Error Updating Home Products Image: ", error);
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
    console.error("Error Updating Home Allies Image: ", error);
  }
}
