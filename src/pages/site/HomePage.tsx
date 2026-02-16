import Expense from "./Expense";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [isAuthenticated, setIsauthenticated] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsauthenticated(user);
    } else {
      navigate("/auth/signin");
    }
  }, []);

  return <>{isAuthenticated && <Expense />}</>;
};

export default Home;
