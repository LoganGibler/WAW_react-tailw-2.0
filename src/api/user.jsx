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
  console.log("This is response.data", response.data);
  cookies.set("AUTH_API", response.data.token, {
    path: "/",
    domain: domain,
    httpOnly: true,
    // secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 12), // 12 hours
  });

  cookies.set("USER_ID", response.data.user_id, {
    path: "/",
    domain: domain,
    httpOnly: true,
    // secure: true,
  });

  console.log("This is cookies", cookies.cookies);
  return response.data;
}
