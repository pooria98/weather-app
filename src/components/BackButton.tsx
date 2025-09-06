import { useNavigate } from "react-router";
import { Icon } from "@iconify/react/dist/iconify.js";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="flex items-center cursor-pointer p-1 text-shadow-xs"
      onClick={() => navigate("/")}
    >
      <Icon icon="material-symbols:chevron-left-rounded" width="24" height="24" />
      <p>Back</p>
    </button>
  );
};

export default BackButton;
