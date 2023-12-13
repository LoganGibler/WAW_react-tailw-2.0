import React, { useState, useEffect } from "react";
import { Navigate, Route } from "react-router-dom";

import { testingProtectedRoute } from "../middleware/auth";

function ProtectedRoute({ element: Component, ...rest }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  async function checkAuthentication() {
    const authenticated = await testingProtectedRoute();
    // console.log("THIS IS authenticated", authenticated);
    setIsAuthenticated(authenticated);
  }

  useEffect(() => {
    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    // Loading state, you can render a loading spinner or message here
    // window.location.reload();
    return (
      <div className="flex justify-center">
        Bad Auth. Please log out to refresh your token.
      </div>
    );
  } else {
    return isAuthenticated ? (
      <Component {...rest} />
    ) : (
      <Navigate to="/access-denied" replace />
    );
  }
}

export default ProtectedRoute;
