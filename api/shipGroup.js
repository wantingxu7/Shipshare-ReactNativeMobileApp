import axios from "axios";
import {REACT_APP_SERVER_URL} from "@env";

export const createShipGroup = async ({shipGroup, token}) => {

  try {
    const response = await axios.post(`${REACT_APP_SERVER_URL}/ship_groups`, shipGroup, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });

    return response.data;
  } catch (error) {
    console.log("error in createShipGroup", error, error?.response?.data);
  }
}

export const editShipGroup = async ({shipGroup, shipGroupId, token}) => {

  try {
    const response = await axios.post(
      `${REACT_APP_SERVER_URL}/ship_groups`,
      {...shipGroup, id: shipGroupId},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
      });

    return response.data;
  } catch (error) {
    console.log("error in editShipGroup", error, error?.response?.data);
  }
}


export const getShipGroupById = async ({token, shipGroupId}) => {

  try {
    const response = await axios.get(`${REACT_APP_SERVER_URL}/ship_group/${shipGroupId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });

    return response.data;
  } catch (error) {
    console.log("error in getShipGroupById", error, error?.response?.data);
  }
}

export const getShipGroupsByUserEmail = async ({token, email}) => {
  try {
    const url = `${REACT_APP_SERVER_URL}/ship_groups?email=${email}`;

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });

    return response.data;
  } catch (error) {
    console.log("error in getShipGroupsByUserEmail", error, error?.response?.data);
  }
}

export const deleteShipGroup = async ({shipGroupId, token}) => {
  try {
    const response = await axios.delete(`${REACT_APP_SERVER_URL}/ship_group/${shipGroupId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });

    return response.data;
  } catch (error) {
    console.log("error in deleteShipGroup", error, error?.response?.data)
  }
};

export const joinShipGroup = async ({shipGroupId, token}) => {
  let response = null
  try {
    response = await axios.post(`${REACT_APP_SERVER_URL}/ship_group/${shipGroupId}/joinGroup`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });

    return response.data;
  } catch (error) {
    const detail = error?.response?.data?.detail;

    if (detail && detail.includes("already joined")) {
      return null;
    } else {
      console.log("error in joinShipGroup", error, error?.response?.data)
    }
  }
};

export const leaveShipGroup = async ({shipGroupId, token}) => {
  try {
    const response = await axios.post(`${REACT_APP_SERVER_URL}/ship_group/${shipGroupId}/leaveGroup`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });

    return response.data;
  } catch (error) {
    console.log("error in leaveShipGroup", error, error?.response?.data)
  }
};


export const getShipGroupsByMembersEmail = async ({token, email}) => {
  try {
    const url = `${REACT_APP_SERVER_URL}/ship_groups/members/${email}`;

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });

    return response.data;
  } catch (error) {
    console.log("error in getShipGroupsByMembersEmail", error, error?.response?.data);
  }
}
