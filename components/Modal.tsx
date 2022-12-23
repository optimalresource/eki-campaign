import { Icon } from "@iconify/react";
import Image from "next/legacy/image";
import { useState, useEffect } from "react";
import ClickAwayListener from "./ClickAwayListener";
import { useRouter } from "next/router";
import { validateEmail } from "./ValidateEmail";
import Notif from "./Notif";

type Props = {
  closeModal: () => void;
  cart: String[];
};

const Modal = ({ closeModal, cart = [] }: Props) => {
  const router = useRouter();
  const [success, setSuccess] = useState<Boolean>(false);
  const [isError, setIsError] = useState<Boolean>(false);
  const [email, setEmail] = useState("");
  const [notify, setNotify] = useState<Boolean>(false);
  const [message, addMessage] = useState<String>("");
  const [isExist, setIsExist] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);

  const closeNotif = () => {
    setNotify(false);
    setIsExist(false);
    setIsError(false);
  };

  useEffect(() => {
    notify
      ? setTimeout(() => {
          setNotify(false);
          setIsExist(false);
          setIsError(false);
        }, 5000)
      : null;
  }, [notify]);

  const completePurchase = () => {
    setLoading(true);
    if (validateEmail(email)) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          product_names: cart.join(),
        }),
      };
      fetch("https://api.kuadratik.com/api/promo", requestOptions)
        .then(async (response) => {
          const isJson = response.headers
            .get("content-type")
            ?.includes("application/json");
          const data = isJson && (await response.json());

          if (!response.ok) {
            const error = (data && data.message) || response.status;
            console.log(error);
            return Promise.reject(error);
          } else {
            setSuccess(true);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          addMessage(error.toString());
          setIsExist(true);
          setIsError(true);
          setNotify(true);
          setLoading(false);
        });
    } else {
      addMessage("Please enter a correct email address");
      setIsExist(true);
      setIsError(true);
      setNotify(true);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-[rgba(0,0,0,0.5)] h-[100vh] fixed top-0 left-0 z-[2500] items-center justify-center w-[100%] overflow-auto no-scrollbar">
      <div className="w-[90%] max-w-[1768px]">
        <Notif
          exit={!notify}
          closeNotif={closeNotif}
          message={message}
          isExist={isExist}
          isError={isError}
        />
      </div>
      <div className="absolute w-full no-scrollbar flex items-center justify-center">
        <ClickAwayListener
          onClickAway={closeModal}
          className="w-[90%] sm:w-[80%]"
        >
          <div className="flex w-full bg-[#fff] md:bg-[url('/assets/Light_Mode_Success_Message_1.gif')] bg-center bg-no-repeat  h-[100vh] flex-col items-center justify-between relative overflow-auto no-scrollbar">
            {!success && (
              <>
                {!loading && (
                  <div className="w-[70%] mb-10 flex flex-col items-start items-center justify-center">
                    <p className="my-10 mt-[100px] text-4xl font-bold">
                      Yay!!!
                    </p>
                    <p className="mb-10 text-xl">
                      You are eligible to receive coupon towards your first
                      order.
                    </p>
                    <label
                      htmlFor="email"
                      className="text-xl text-left w-[100%] mt-10"
                    >
                      Email Address
                    </label>
                    <div className="border-2 w-[100%] mt-4">
                      <input
                        type="email"
                        className="w-[100%] px-4 h-[50px]"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <button
                      className="mt-4 bg-[#09B82E] text-[#fff] flex p-2 px-[50px] sm:px-[100px] w-[100%] items-center justify-center h-[50px] text-xl"
                      onClick={completePurchase}
                    >
                      Done
                    </button>
                  </div>
                )}

                {loading && (
                  <Image
                    src="/assets/loader.gif"
                    width={240}
                    height={240}
                    alt="Loader"
                  />
                )}
              </>
            )}

            {success && (
              <div className="flex flex-col items-center justify-center flex-1">
                <Icon
                  icon="material-symbols:check-circle"
                  className="text-[#09B82E] text-[100px]"
                />
                <p className="mt-[20px] text-2xl sm:text-4xl">Success</p>
              </div>
            )}
            <div className="w-[70%] my-10 flex flex-col items-start items-center justify-center">
              <button
                className="mt-[50px] text-[#09B82E] border-2 border-dotted border-[#09B82E] flex p-2 px-[70px] items-center h-[50px] font-bold"
                onClick={() => router.push("/")}
              >
                Play Again
              </button>
            </div>
          </div>
        </ClickAwayListener>
      </div>
    </div>
  );
};
export default Modal;
