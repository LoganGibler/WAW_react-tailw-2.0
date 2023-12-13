import axios from "axios";
const URL = "http://localhost:8000";
// const URL = "https://ops-dashboard-node-js-api.onrender.com";

const headersTemp = document.cookie.split(";"); // <-- this get all cookies saves and splits them in the array.
const finalHeaders = {};
if (headersTemp[0] !== "") {
  headersTemp.forEach((header) => {
    // <-- looping on all cookies
    const headerTemp = header.split("="); // <-- split each cookie to get key and value
    finalHeaders[headerTemp[0].trim()] = headerTemp[1].trim(); // <-- save on object to access using keys.
  });
}

// user auth middleware
export async function testingProtectedRoute() {
  // const username = localStorage.getItem("username");
  const response = await axios.get(`${URL}/users/testAuth`, {
    headers: {
      authorization: finalHeaders["AUTH_API"],
      user_id: finalHeaders["USER_ID"],
    },
  });
  console.log(response.data);
  return response.data;
}
//////////////////////////////
