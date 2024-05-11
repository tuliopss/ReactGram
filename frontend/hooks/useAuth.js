import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const [auth, setAuth] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setAuth(true);
    } else {
      setAuth(false);
    }

    setLoading(false);
  }, [user]);

  return { auth, loading };
};
