import { useNavigate } from "react-router-dom";
import { logoutFunction } from "../adapters/LogoutAdapters";
import { LogoutProps } from "../types/types";

const Logout: React.FC<LogoutProps> = ({ name, email }) => {
  const navigate = useNavigate();

  return (
    <button
      className="logout_button"
      onClick={() => logoutFunction(name, email, navigate)}
    >
      Logout
    </button>
  );
};
export default Logout;

