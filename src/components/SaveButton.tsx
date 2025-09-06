import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams } from "react-router";
import { useAtom } from "jotai";
import { locations } from "../state";
import { AnimatePresence, motion } from "motion/react";

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
      <AnimatePresence mode="wait">
        {id && saved.includes(id) ? (
          <motion.div
            key="filled"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Icon icon="material-symbols:bookmark-rounded" width="28" height="28" />
          </motion.div>
        ) : (
          <motion.div
            key="outline"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Icon icon="material-symbols:bookmark-outline-rounded" width="28" height="28" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default SaveButton;
