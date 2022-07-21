import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

const Home = () => {
  const { id, email } = useAppSelector((state) => state.authSlice);
  return (
    <div>
      <Link to={"/login"}>Login</Link>
      {id}
      {email}
    </div>
  );
};

export default Home;
