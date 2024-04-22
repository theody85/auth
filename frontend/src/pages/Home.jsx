import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const params = useParams();
  //   const [cookies, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      await axios
        .get(`http://localhost:4000/api/user/${params.userId}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("dataaaa", res.data);
          const { username } = res.data;
          setUsername(username);
          console.log("data here");
          toast(`Hello ${username}`, {
            position: "top-right",
          });
        })
        .catch(() => {
          console.log("no data");
          navigate("/login");
        });
    };

    verifyCookie();
  }, []);

  const Logout = async () => {
    await axios
      .get(`http://localhost:4000/api/auth/logout`, {
        withCredentials: true,
      })
      .then(() => navigate("/login"))
      .catch(() => toast.error("Something went wrong"));
  };

  console.log("username", username);
  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
