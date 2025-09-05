import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams } from "react-router";
import { useAtom } from "jotai";
import { locations } from "../state";

const SaveButton = () => {
  const [saved, setSaved] = useAtom(locations);
  const { id } = useParams();

  return (
    <button
      className="cursor-pointer"
      onClick={() => {
        if (id) {
          if (saved.includes(id)) {
            setSaved((prev) => prev.filter((item) => item !== id));
          } else {
            setSaved((prev) => [...prev, id]);
          }
        }
      }}
    >
      {id && saved.includes(id) ? (
        <Icon icon="material-symbols:bookmark-rounded" width="28" height="28" />
      ) : (
        <Icon icon="material-symbols:bookmark-outline-rounded" width="28" height="28" />
      )}
    </button>
  );
};

export default SaveButton;
