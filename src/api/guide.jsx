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

// export async function getGuides() {
//   try {
//     const guides = await axios.get(`${URL}/getGuides`, {
//       headers: {
//         authorization: finalHeaders["AUTH_API"],
//         user_id: finalHeaders["USER_ID"],
//       },
//     });
//     return guides;
//   } catch (error) {
//     throw error;
//   }
// }
export async function getPublishedApprovedGuides() {
  const guides = await axios.get(`${URL}/guides/getPublishedApprovedGuides`);
  // console.log(guides);
  return guides.data.publicGuides;
}
export async function createGuides() {}

export async function deleteGuides() {}
