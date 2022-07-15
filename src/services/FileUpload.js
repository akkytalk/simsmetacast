import { baseUrl } from "shared/baseURL";
import axios from "../shared/axios";

class UploadFilesService {
  upload(data, user, file, onUploadProgress) {
    axios.post(baseUrl + `file-uploads/${data.id}?_method=PUT`, user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
    });
    return axios.post(baseUrl + `file-uploads/${data.id}?_method=PUT`, user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
      onUploadProgress,
    });
  }

  getFiles(data) {
    return axios
      .get(baseUrl + "file-uploads", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
      })

      .catch((error) => console.log(`error`, error));
  }
}

export default new UploadFilesService();
