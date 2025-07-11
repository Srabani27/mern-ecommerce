import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute({ token }) {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  const authCheck = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`);
      setOk(res.data.ok);
    } catch (error) {
      console.error(error);
      setOk(false);
    }
  };

  useEffect(() => {
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
}