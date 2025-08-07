import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";

// we will wrap the entire application, so you must use the children prop
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth(); // whether the user is authenticated or not to check
  const navigate = useNavigate(); 

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/"); // Navigate to the other page, here becouse you cannot use navigate at the top level
    },
    [isAuthenticated, navigate] // 
  );

  return isAuthenticated ? children : null;
}

export default ProtectedRoute; // export
