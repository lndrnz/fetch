import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleInputChange, handleSubmit } from "../adapters/LoginAdapters";
import "../App.css";

const Login = () => {
  const [name, setName] = useState<string>("test");
  const [email, setEmail] = useState<string>("lander@gmail.com");
  const [auth, setAuth] = useState<boolean>(false);
  const navigate = useNavigate();

  const localAuth = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    setAuth(localAuth);
  }, []);

  return (
    <div>
      {auth === false ? (
        <div className="login">
          <h1 className="login_header">PawfectMatch</h1>
          <form
            className="login_form"
            onSubmit={(e) => handleSubmit(e, name, email, navigate)}
          >
            <input
              className="input_form"
              type="text"
              name="name"
              value={name}
              placeholder="Name"
              onChange={(e) => handleInputChange(e, setName)}
            />
            <input
              className="input_form"
              type="text"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => handleInputChange(e, setEmail)}
            />
            <button className="login_button" type="submit">
              Login
            </button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Login;
