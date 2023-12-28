import axios from "axios";

// const URL = "http://localhost:8000";
const URL = "https://waw-api-node-js.onrender.com"
// const URL = "https://ops-dashboard-node-js-api.onrender.com";
const headersTemp = document.cookie.split(";");
const finalHeaders = {};
if (headersTemp[0] !== "") {
  headersTemp.forEach((header) => {
    const headerTemp = header.split("=");
    finalHeaders[headerTemp[0].trim()] = headerTemp[1].trim(); // save on object to access using keys.
  });
}

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based.
const day = currentDate.getDate().toString().padStart(2, "0");
const hours = currentDate.getHours().toString().padStart(2, "0");
const minutes = currentDate.getMinutes().toString().padStart(2, "0");
// const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
const formattedDate = `${month}-${day}-${year} ${hours}:${minutes}`;
const dayDate = `${month}-${day}-${year}`;

export async function getPublishedApprovedGuides() {
  const guides = await axios.get(`${URL}/guides/getPublishedApprovedGuides`);
  // console.log(guides);
  return guides.data.publicGuides;
}

export async function searchGuides(searchData) {
  const guides = await axios.post(`${URL}/guides/getSearchResult`, {
    searchData: searchData,
  });
  // console.log("Searched Guides:", guides);
  return guides.data.searchResult;
}

export async function getFeaturedGuides() {
  const guides = await axios.get(`${URL}/guides/getFeaturedGuides`);
  return guides.data.featuredGuides;
}

export async function getGuideById(_id) {
  const guide = await axios.post(`${URL}/guides/getPublicGuideById`, {
    _id: _id,
  });

  return guide;
}

export async function forceGetGuideById(id) {
  try {
    const response = await axios.post(
      `${URL}/guides/forceGetGuideById`,
      { _id: id },
      {
        headers: {
          authorization: finalHeaders["AUTH_API"],
          user_id: finalHeaders["USER_ID"],
        },
      }
    );
    console.log("REsponse from forceGetGuide:", response);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function publishGuide(_id) {
  try {
    const updatedGuide = await axios.post(
      `${URL}/guides/publishGuide`,
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

    return updatedGuide.data;
  } catch (error) {
    throw error;
  }
}

export async function unpublishGuide(_id) {
  try {
    const updatedGuide = await axios.post(
      `${URL}/guides/unpublishGuide`,
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

    return updatedGuide.data;
  } catch (error) {
    throw error;
  }
}

export async function getPublishedUnapprovedGuides() {
  try {
    const response = await axios.get(
      `${URL}/guides/getPublishedUnapprovedGuides`,
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

export async function approveGuide(_id) {
  try {
    const response = await axios.post(
      `${URL}/guides/approveGuide`,
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

export async function getUsersGuideByID(_id, guide_id) {
  try {
    const response = await axios.post(
      `${URL}/guides/getUsersGuideByID`,
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
    return response;
  } catch (error) {
    console.error;
  }
}

export async function createGuide(
  vmtitle,
  difficulty,
  hostedby,
  system,
  description,
  activeUser,
  author
) {
  const response = await axios.post(
    `${URL}/guides/createGuide`,
    {
      vmtitle: vmtitle,
      difficulty: difficulty,
      system: system,
      hostedby: hostedby,
      description: description,
      date: dayDate,
      approved: false,
      published: false,
      author_id: activeUser,
      author: author,
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

export async function deleteGuide(_id) {
  try {
    const response = await axios.post(
      `${URL}/guides/deleteGuide`,
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
  } catch (error) {
    throw error;
  }
}

export async function addStep(_id, step) {
  try {
    const response = await axios.post(
      `${URL}/guides/addStep`,
      {
        _id: _id,
        step: step,
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

export async function deleteStep(_id, stepIndex) {
  try {
    const response = await axios.post(
      `${URL}/guides/deleteStep`,
      {
        _id: _id,
        index: stepIndex,
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

export async function updateHeader(_id, vmtitle, difficulty, system, hostedby) {
  try {
    const response = await axios.post(
      `${URL}/guides/updateHeader`,
      {
        _id: _id,
        vmtitle: vmtitle,
        difficulty: difficulty,
        system: system,
        hostedby: hostedby,
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

export async function updateDescription(_id, description) {
  try {
    const response = await axios.post(
      `${URL}/guides/editDescription`,
      {
        _id: _id,
        newData: description,
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

export async function updateStep(_id, stepIndex, step) {
  try {
    const response = await axios.post(
      `${URL}/guides/editStep`,
      {
        _id: _id,
        index: stepIndex,
        newStepData: step,
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
