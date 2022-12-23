import Layout from "../components/Layout";
import Products from "../components/Products";
import { useState } from "react";

const PurchasePage = () => {
  const [cart, setCart] = useState<String[]>([]);
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [noItem, setNoItem] = useState<Boolean>(false);
  const [notify, setNotify] = useState<Boolean>(false);
  const [message, addMessage] = useState<String>("");
  const [isExist, setIsExist] = useState<Boolean>(false);
  const [isError, setIsError] = useState<Boolean>(false);
  const [refresh, setRefresh] = useState<Boolean>(false);

  const setModal = () => {
    if (cart.length < 1) {
      setNoItem((previous) => !previous);
    } else {
      setNoItem(false);
      setShowModal((previous) => !previous);
    }
  };
  return (
    <Layout
      title="Select a Product & Win a Coupon"
      cart={cart}
      setShowModal={setModal}
      showNotif={notify}
      notifMessage={message}
      isNotifExist={isExist}
      isNotifError={isError}
      refreshNotif={refresh}
    >
      <Products
        setCart={setCart}
        modalShow={showModal}
        noItem={noItem}
        setNotify={setNotify}
        addMessage={addMessage}
        setIsExist={setIsExist}
        setIsError={setIsError}
        setRefresh={() => setRefresh((previous) => !previous)}
      />
    </Layout>
  );
};

export default PurchasePage;
