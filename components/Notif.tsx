import { Icon } from "@iconify/react";
import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";

type NotifProps = {
  exit: Boolean;
  closeNotif: () => void;
  message: String;
  isExist: Boolean;
  isError: Boolean;
};

const notificationVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 1000,
  },
  visible: {
    opacity: 1,
    transition: { type: "spring", damping: 10, stiffness: 100 },
    x: 0,
  },
};

const Notif = ({
  exit = false,
  closeNotif,
  isExist = false,
  message = "",
  isError = false,
}: NotifProps) => {
  const [color, setColor] = useState<String>("border-[#09B82E]");

  useEffect(() => {
    if (isError) {
      setColor("border-[red]");
    } else {
      setColor("border-[#09B82E]");
    }
  }, [isError]);
  return (
    <motion.div
      className={`fixed top-[20px] right-[20px] bg-white min-w-[200px] p-4 flex items-center z-[2000] border-l-[4px] ${color} justify-around gap-5`}
      variants={notificationVariants}
      initial="hidden"
      animate={exit ? "hidden" : "visible"}
      exit="hidden"
    >
      {!isError && (
        <div className="bg-[#09B82E] p-4 text-white rounded-[50%] text-xl">
          <Icon icon="material-symbols:check-circle" />
        </div>
      )}
      {isError && (
        <div className="bg-[red] p-4 text-white rounded-[50%] text-xl">
          <Icon icon="carbon:close" />
        </div>
      )}
      <div className="flex flex-col items-start">
        {!isExist && <p className="font-bold">Yay! Item added to cart!</p>}
        <p className="text-sm">{message}</p>
      </div>
      <Icon
        icon="carbon:close"
        className="text-xl cursor-pointer"
        onClick={closeNotif}
      />
    </motion.div>
  );
};

export default Notif;
