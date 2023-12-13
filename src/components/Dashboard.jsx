import React, { useEffect, useState } from "react";

const Dashboard = ({activeSession}) => {
  useEffect(() => {
    console.log("THIS IS activeSession on dash", activeSession);
  }, [activeSession]);

  return (
    <div>
      <h1 className="text-white">Testing protected route.</h1>
    </div>
  );
};

export default Dashboard;
