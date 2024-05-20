import { api, requestConfig } from "../utils/api";

const publishPhoto = async (photo, token) => {
  const config = requestConfig("POST", photo, token, true);

  try {
    const res = await fetch(`${api}/photos`, config);

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const getUserPhotos = async (id, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(`${api}/photos/user/${id}`, config);

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deletePhoto = async (id, token) => {
  const config = requestConfig("DELETE", null, token);

  try {
    const res = await fetch(`${api}/photos/${id}`, config);

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const updatePhoto = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(`${api}/photos/${id}`, config);

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const photoService = { publishPhoto, getUserPhotos, deletePhoto, updatePhoto };

export default photoService;
