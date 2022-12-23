import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Notif from "./Notif";

type Props = {
  children?: ReactNode;
  title?: string;
  cart?: String[];
  setShowModal?: () => void;
  isNotifExist?: Boolean;
  isNotifError?: Boolean;
  notifMessage?: String;
  showNotif?: Boolean;
  refreshNotif?: Boolean;
};

const Layout = ({
  children,
  cart = [],
  title = "Africa Largest Marketplace",
  setShowModal,
  isNotifExist = false,
  isNotifError = false,
  notifMessage = "",
  showNotif = false,
  refreshNotif = false,
}: Props) => {
  const [notify, setNotify] = useState<Boolean>(showNotif);
  const [message, addMessage] = useState<String>(notifMessage);
  const [isExist, setIsExist] = useState<Boolean>(isNotifExist);
  const [isError, setIsError] = useState<Boolean>(isNotifError);
  const [refresh, setRefresh] = useState<Boolean>(refreshNotif);

  const closeNotif = () => {
    setNotify(false);
    setIsExist(false);
    setIsError(false);
  };

  useEffect(() => {
    setIsError(isNotifError);
    setIsExist(isNotifExist);
    addMessage(notifMessage);
    setNotify(showNotif);
    setRefresh(refreshNotif);
  }, [isNotifError, isNotifExist, notifMessage, showNotif, refreshNotif]);

  useEffect(() => {
    notify
      ? setTimeout(() => {
          setNotify(false);
          setIsExist(false);
          setIsError(false);
        }, 5000)
      : null;
  }, [notify]);

  const openModal = () => {
    if (cart.length < 1) {
      addMessage("Please add an item to cart to checkout");
      setIsExist(true);
      setIsError(true);
      setNotify(true);
    } else {
      setShowModal !== undefined ? setShowModal() : () => {};
    }
  };
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Bringing bulk African varieties to your door at wholesale pricing,
          low-cost shipping & speedy delivery in 3 easy clicks."
        />
        <meta name="og:title" content="Eki Marketplace" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="eki.market" />
        <meta property="og:site_name" content="Eki Marketplace" />
        <meta
          property="og:description"
          content="Bringing bulk African varieties to your door at wholesale pricing,
          low-cost shipping & speedy delivery in 3 easy clicks."
        />
        <meta property="og:image" content="/assets/logo.png" />

        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <div className='bg-[url("/assets/svgs/bg.svg")] bg-fixed h-full min-h-[100vh] w-[100%] relative pb-[50px]'>
        {notify && (
          <div className="w-[90%] max-w-[1768px]">
            <Notif
              exit={!notify}
              closeNotif={closeNotif}
              message={message}
              isExist={isExist}
              isError={isError}
            />
          </div>
        )}
        <header className="flex justify-between items-center w-[90%] my-[0] mx-auto max-w-[1768px]">
          <Link href="/">
            <Image
              alt="logo"
              src="/assets/svgs/ekiLogo.svg"
              width={89}
              height={50}
              className="cursor-pointer"
            />
          </Link>
          <div
            className="relative text-[30px] cursor-pointer"
            onClick={openModal}
          >
            <div className="mr-[20px] mt-[20px]">
              <Icon icon="emojione:shopping-cart" />
            </div>
            <div className="absolute right-[0] w-[25px] h-[25px] top-[5px] text-[12px] bg-[#FFC403] rounded-[100%] flex items-center justify-center text-center">
              {cart?.length}
            </div>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Layout;
