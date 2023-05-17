import axios from "axios";
import {REACT_APP_SERVER_URL} from "@env";

export const uploadImage = async ({fileUri, token}) => {
  if (!fileUri) {
    return null;
  }
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      name: 'file',
      type: 'application/octet-stream'
    });

    const response = await axios.post(`${REACT_APP_SERVER_URL}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token,
      }
    });
    return response?.data?.imageURL;


  } catch (error) {
    console.log("error in uploadImage", error, error?.response?.data);
  }
}
