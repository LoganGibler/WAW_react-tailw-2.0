import axios from "axios";

const URL = "http://localhost:8000";
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
export async function createGuides() {}

export async function deleteGuides() {}

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

export function getGuideById(_id) {
  const guide = axios.post(`${URL}/guides/getPublicGuideById`, {
    _id: _id
  });

  return guide;
}
