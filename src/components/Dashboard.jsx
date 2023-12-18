import React, { useEffect, useState } from "react";

const Dashboard = ({ activeSession }) => {
  const [userID, setUserID] = useState("");
  const cookieString = document.cookie;
  const cookies = {};
  const cookieArray = cookieString.split(";");

  async function getUserId(cookiesArray) {
    const userIdCookie = await cookiesArray.find((cookie) =>
      cookie.startsWith(" USER_ID=")
    );

    if (userIdCookie) {
      const userId = await userIdCookie.split("=")[1];
      setUserID(userId);
    }
    return null;
  }

  useEffect(() => {
    fetchUserById(userID);
    getUserId(cookieArray);
  }, [activeSession]);

  return <div className="w-full flex flex-col justify-center"></div>;
};

export default Dashboard;
