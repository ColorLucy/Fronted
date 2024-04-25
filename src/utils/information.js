import axios from "axios";

const url = "http://127.0.0.1:8000";

export async function getInfoBarInfo() {
  try {
    const { data } = await axios.get(url + `/info/infobar-info/`);
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching info: ", error);
  }
}
