import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const URL = "http://localhost:8000";
// const URL = "https://ops-dashboard-node-js-api.onrender.com";

const domain = "http://localhost:5173";

export async function createUser(username, password) {
  const response = await axios.post(`${URL}/users/register`, {
    username: username,
    password: password,
  });
  return response.data;
}

export async function loginUser(username, password) {
  const response = await axios.post(`${URL}/users/login`, {
    username: username,
    password: password,
  });
  // console.log("This is response.data", response.data);
  document.cookie = `AUTH_API=${response.data.token}`;
  document.cookie = `USER_ID=${response.data.user_id}`;
  return response.data;
}
