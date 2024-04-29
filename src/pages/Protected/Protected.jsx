import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";

const Protected = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return children;
};

export default Protected;
