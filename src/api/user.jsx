import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const URL = "http://localhost:8000";
// const URL = "https://ops-dashboard-node-js-api.onrender.com";

const domain = "http://localhost:5173";

const headersTemp = document.cookie.split(";");
const finalHeaders = {};
if (headersTemp[0] !== "") {
  headersTemp.forEach((header) => {
    // <-- looping on all cookies
    const headerTemp = header.split("=");
    finalHeaders[headerTemp[0].trim()] = headerTemp[1].trim();
  });
}

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

export async function getUserDataByID(_id) {
  const response = await axios.post(
    `${URL}/users/getUser`,
    {
      _id: _id,
    },
    {
      headers: {
        authorization: finalHeaders["AUTH_API"],
        user_id: finalHeaders["USER_ID"],
      },
    }
  );
  return response.data;
}

export async function addGuideToUserBookmarks(_id, guide_id) {
  const response = await axios.post(
    `${URL}/users/addGuideToBookmarks`,
    {
      _id: _id,
      guide_id: guide_id,
    },
    {
      headers: {
        authorization: finalHeaders["AUTH_API"],
        user_id: finalHeaders["USER_ID"],
      },
    }
  );
  return response.data;
}

export async function getUsersBookmarkedGuides(activeUser) {
  try {
    // console.log(activeUser);
    const response = await axios.post(
      `${URL}/users/getUserBookmarks`,
      {
        _id: activeUser,
      },
      {
        headers: {
          authorization: finalHeaders["AUTH_API"],
          user_id: finalHeaders["USER_ID"],
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUsersBookmarkedGuidesData(activeUser) {
  try {
    // console.log("FronEND passed to bookmarkeddata user:", activeUser);
    const response = await axios.post(
      `${URL}/users/getUsersBookmarkedData`,
      {
        _id: activeUser,
      },
      {
        headers: {
          authorization: finalHeaders["AUTH_API"],
          user_id: finalHeaders["USER_ID"],
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function removeGuideFromBookmarks(_id, guide_id) {
  try {
    const response = await axios.post(
      `${URL}/users/removeGuideFromBookmarks`,
      {
        _id: _id,
        guide_id: guide_id,
      },
      {
        headers: {
          authorization: finalHeaders["AUTH_API"],
          user_id: finalHeaders["USER_ID"],
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUsersGuides(_id) {
  try {
    const response = await axios.post(
      `${URL}/guides/getUsersGuides`,
      {
        _id: _id,
      },
      {
        headers: {
          authorization: finalHeaders["AUTH_API"],
          user_id: finalHeaders["USER_ID"],
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}


