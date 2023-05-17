import axios from "axios";
import {REACT_APP_SERVER_URL, REACT_APP_TRACKTRY_API_KEY} from "@env";

export const createParcel = async ({parcel, token}) => {
  try {
    const response = await axios.post(`${REACT_APP_SERVER_URL}/parcels`, parcel, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    }).then(() =>
      postNewTracking(
        {
          trackingNumber: parcel.trackingNumber,
          courier: parcel.courier
        }));
    return response.data;

  } catch (error) {
    console.log("error in createParcel", error, error?.response?.data);
  }
}

export const editParcel = async ({parcel, parcelId, token}) => {
  try {
    const response = await axios.post(
      `${REACT_APP_SERVER_URL}/parcels`,
      {...parcel, id: parcelId},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
      });

    return response.data;

  } catch (error) {
    console.log("error in editParcel", error, error?.response?.data);
    return Promise.reject(error);
  }
}

export const getParcelById = async ({token, parcelId}) => {
  try {
    const response = await axios.get(`${REACT_APP_SERVER_URL}/parcel/${parcelId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });

    return response.data;
  } catch (error) {
    console.log("error in getParcelById", error, error?.response?.data);
  }
}

export const getParcelsByUserEmail = async ({token, email}) => {
  try {
    const url = `${REACT_APP_SERVER_URL}/parcels?email=${email}`;
    console.log(url);


    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });

    return response.data;
  } catch (error) {
    console.log("error in getParcelsByUserEmail", error, error?.response?.data);
  }
}
export const getParcelsByShipGroupId = async ({token, shipGroupId}) => {
  try {
    const url = `${REACT_APP_SERVER_URL}/parcels?shipGroup=${shipGroupId}`;
    console.log(url);

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });

    return response.data;
  } catch (error) {
    console.log("error in getParcelsByShipGroupId", error, error?.response?.data);
  }
}

export const postNewTracking = async ({trackingNumber, courier}) => {
  try {
    const options = {
      method: 'POST',
      url: 'https://api.tracktry.com/v1/trackings/post',
      headers: {
        'Content-Type': 'application/json',
        'Tracktry-Api-Key': REACT_APP_TRACKTRY_API_KEY
      },
      data: {
        tracking_number: trackingNumber,
        carrier_code: courier
      }
    };

    return await axios.request(options);
  } catch (error) {
    console.log(error)
    console.log(error?.response?.data)
  }
}

export const getParcelTracking = async ({trackingNumber, courier}) => {
  try {
    const options = {
      method: 'GET',
      url: `https://api.tracktry.com/v1/trackings/${courier}/${trackingNumber}`,
      headers: {
        'Content-Type': 'application/json',
        'Tracktry-Api-Key': REACT_APP_TRACKTRY_API_KEY
      }
    };

    const response = await axios.request(options);

    return response.data.data[0];
  } catch (error) {
    console.log("error in getParcelTracking", error, error?.response?.data);
  }
}

export const multiGetParcelTrackings = async ({parcels}) => {
  try {
    const options = (trackingNumber, courier) => {
      return {
        method: 'GET',
        url: `https://api.tracktry.com/v1/trackings/${courier}/${trackingNumber}`,
        headers: {
          'Content-Type': 'application/json',
          'Tracktry-Api-Key': REACT_APP_TRACKTRY_API_KEY
        }
      }
    };

    const responses = await
      Promise.all(parcels.filter((parcel) => parcel.trackingNumber && parcel.courier)
        .map((parcel) =>
          axios.request(options(parcel.trackingNumber, parcel.courier))));

    return responses.map((response) => ({
      trackingNumber: response.data.data[0].tracking_number,
      data: response.data.data[0]
    }));
  } catch (error) {
    console.log("error in multiGetParcelTrackings", error, error?.response?.data);
  }
}

export const deleteParcel = async ({parcelId, token}) => {
  try {
    const response = await axios.delete(`${REACT_APP_SERVER_URL}/parcel/${parcelId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });

    return response.data;
  } catch (error) {
    console.log("error in deleteParcel", error, error?.response?.data)
  }
};
