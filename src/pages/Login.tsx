import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { handleInputChange, handleSubmit } from "../adapters/LoginAdapters";

const Login = () => {
  const [name, setName] = useState<string>("test");
  const [email, setEmail] = useState<string>("lander@gmail.com");
  const navigate = useNavigate();



  return (
    <div>
        <div className="login">
          <div className="header_container">
            <h1 className="login_header">Pawfect Match</h1>
            <p className="login_paragraph">Find the perfect pet for you!</p>
          </div>
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
    </div>
  );
};

export default Login;
