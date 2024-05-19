import { api, requestConfig } from "../utils/api";

const profile = async (data, token) => {
  const config = requestConfig("GET", data, token);

  try {
    const res = await fetch(`${api}/users/profile`, config);
    // .then((res) => res.json())
    // .catch((err) => err);

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(`${api}/users/${id}`, config);
    // .then((res) => res.json())
    // .catch((err) => err);

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = async (data, token) => {
  const config = requestConfig("PUT", data, token, true);

  try {
    const res = await fetch(`${api}/users/`, config);

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  profile,
  updateProfile,
  getUserById,
};

export default userService;
