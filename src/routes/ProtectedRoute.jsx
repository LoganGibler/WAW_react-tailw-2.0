import React, { useState, useEffect } from "react";
import { Navigate, Route } from "react-router-dom";

import { testingProtectedRoute } from "../middleware/auth";

function ProtectedRoute({ element: Element, ...rest }) {
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
    return (
      <div className="flex justify-center text-slate-400">
        Bad Auth. Please log out to refresh your token.
      </div>
    );
  } else {
    return isAuthenticated ? (
      <Element {...rest} />
    ) : (
      <Navigate to="/access-denied" replace />
    );
  }
}

export default ProtectedRoute;
