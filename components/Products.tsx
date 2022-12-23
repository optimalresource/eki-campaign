import { Icon } from "@iconify/react";
import Image from "next/legacy/image";
import { motion, MotionProps, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import Modal from "./Modal";

type Props = {
  setCart: (cart: String[]) => void;
  modalShow: Boolean;
  noItem: Boolean;
  setNotify: React.Dispatch<React.SetStateAction<Boolean>>;
  addMessage: React.Dispatch<React.SetStateAction<String>>;
  setIsExist: React.Dispatch<React.SetStateAction<Boolean>>;
  setIsError: React.Dispatch<React.SetStateAction<Boolean>>;
  setRefresh: () => void;
} & MotionProps;

const categoryVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 200,
  },
  visible: {
    opacity: 1,
    transition: { type: "spring", damping: 10, stiffness: 100, delay: 1 },
    x: 0,
  },
};

const Products = ({
  modalShow,
  setCart,
  noItem = false,
  setNotify,
  addMessage,
  setIsExist,
  setIsError,
  setRefresh,
  ...MotionProps
}: Props) => {
  const [page, setPage] = useState<Number>(0);
  const [category, setCategory] = useState<String>("");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cart, addCart] = useState<String[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const openCategory = (cat: String) => {
    setCategory(cat);
    let prod = Prods.filter((val) => {
      return val.category === cat;
    });
    setProducts(prod);
    setPage(1);
  };

  useEffect(() => {
    if (cart?.length > 0) setShowModal((previous) => !previous);
  }, [modalShow]);

  const addNewItem = (value: String) => {
    if (!cart.includes(value)) {
      addCart([...cart, value]);
      addMessage("Item [" + value + "] has been added to your cart");
      setCart([...cart, value]);
      setIsError(false);
      setRefresh();
      setNotify(true);
    } else {
      addMessage("Item [" + value + "] already in your cart");
      setIsExist(true);
      setRefresh();
      setNotify(true);
    }
  };

  const submitForm = () => {
    if (cart.length < 1) {
      addMessage("Please add an item to cart to checkout");
      setIsExist(true);
      setIsError(true);
      setRefresh();
      setNotify(true);
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="max-w-[1768px] w-[90%] my-0 mt-4 mx-auto text-center flex flex-col items-center">
      {showModal && <Modal closeModal={closeModal} cart={cart} />}
      <h1 className="text-2xl md:text-3xl font-['PlayfairDisplay-Black'] font-black leading-[30px] font-bold mb-3">
        What would you like to purchase as an{" "}
        <span className="text-[#09B82E]">Eki Shopper?</span>
      </h1>
      {/* <h1 className="text-3xl md:text-5xl font-['PlayfairDisplay-Black'] font-black leading-[60px] flex items-center text-center flex-wrap max-w-[90%] justify-center font-bold mb-[50px]"></h1> */}

      {page === 0 && (
        <motion.div
          className="flex w-[100%] justify-around flex-wrap items-center max-w-[768px] font-['Poppins', sans-serif]"
          variants={categoryVariants}
        >
          {Cat.map((val, index) => {
            return (
              <motion.div
                className="w-[207px] h-[282px] bg-[#fff] flex flex-col p-1 rounded-xl m-4 cursor-pointer items-center"
                onClick={() => openCategory(val?.name)}
                key={index}
                variants={categoryVariants}
                initial={index === 1 ? "visible" : "hidden"}
                animate="visible"
                {...MotionProps}
              >
                <Image src={val?.url} width={197} height={175} alt="Fashion" />
                <p className="mt-4 mb-2 text-sm">2 Activities 1 Coupon</p>
                <h3 className="text-2xl font-bold">{val?.name}</h3>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {page === 1 && (
        <>
          <div className="flex w-[100%] justify-around flex-wrap items-center max-w-[1220px] font-['Poppins', sans-serif] responsive-height overflow-y-auto no-scrollbar">
            {products.map((val, index) => {
              return (
                <motion.div
                  className="w-[350px] bg-[#fff] flex flex-col py-3 rounded-xl m-4 items-center"
                  key={index}
                  variants={categoryVariants}
                  initial={
                    index === 1 || (index - 1) % 3 === 0 ? "visible" : "hidden"
                  }
                  animate="visible"
                >
                  <Image
                    src={val?.url}
                    width={318}
                    height={200}
                    alt={val?.name}
                  />
                  <div className="flex justify-between items-center px-5 pt-4 w-full text-[#425466] font-bold ">
                    <h3 className="text-[17px] font-normal">{val?.name}</h3>
                    <span
                      className="p-3 bg-[#FFC727] text-2xl rounded-full text-[#000] cursor-pointer"
                      onClick={() => addNewItem(val?.name)}
                    >
                      <Icon icon="material-symbols:shopping-cart-outline" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex gap-5 items-center flex-col sm:flex-row">
            <button
              className="mt-[50px] bg-[#09B82E] text-[#fff] flex p-2 px-[50px] sm:px-[100px] items-center rounded-[50px]"
              onClick={submitForm}
            >
              Checkout
            </button>
            <div
              className="text-[#09B82E] sm:mt-[50px] underline hover:no-underline font-bold cursor-pointer"
              onClick={() => setPage(0)}
            >
              Choose a different category
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const Cat = [
  { name: "Groceries", url: "/assets/cat-groceries-1.png" },
  { name: "Books", url: "/assets/cat-books.png" },
  { name: "Fashion", url: "/assets/cat-fashion.png" },
];

type ProductType = {
  name: string;
  url: string;
  category: string;
};

export const Prods = [
  {
    name: "Yam Flour",
    url: "/assets/products/flour.png",
    category: "Groceries",
  },
  {
    name: "Dried Catfish",
    url: "/assets/products/dried-fish.png",
    category: "Groceries",
  },
  {
    name: "Dried Atarodo",
    url: "/assets/products/pepper.png",
    category: "Groceries",
  },
  {
    name: "Lafun (Cassava Flour)",
    url: "/assets/products/fry.png",
    category: "Groceries",
  },
  {
    name: "Pepper Soup Spice",
    url: "/assets/products/ogbono.png",
    category: "Groceries",
  },
  {
    name: "Garri",
    url: "/assets/products/white-garri.png",
    category: "Groceries",
  },
  {
    name: "Ankara Trainers",
    url: "/assets/products/ankara-trainers.png",
    category: "Fashion",
  },
  {
    name: "Ankara Fabric",
    url: "/assets/products/ankara-fabric.png",
    category: "Fashion",
  },
  {
    name: "African Accessories",
    url: "/assets/products/african-accessories.png",
    category: "Fashion",
  },
  {
    name: "African Royal",
    url: "/assets/products/african-royal.png",
    category: "Fashion",
  },
  {
    name: "African Guinea",
    url: "/assets/products/african-guinea.png",
    category: "Fashion",
  },
  {
    name: "African Print Shoes",
    url: "/assets/products/african-print-shoes.png",
    category: "Fashion",
  },
  {
    name: "Infinite Riches",
    url: "/assets/products/infinite-riches.png",
    category: "Books",
  },
  {
    name: "Purple Hibiscus",
    url: "/assets/products/purple-hibiscus.png",
    category: "Books",
  },
  {
    name: "Precolonial Black Africa",
    url: "/assets/products/precolonial-black-africa.png",
    category: "Books",
  },
  {
    name: "Kids Read The World: Africa",
    url: "/assets/products/kids-read-the-world-africa.png",
    category: "Books",
  },
  {
    name: "I Am A Girl From Africa",
    url: "/assets/products/i-am-a-girl-from-africa.png",
    category: "Books",
  },
  {
    name: "African Literature",
    url: "/assets/products/african-literature.png",
    category: "Books",
  },
];

export default Products;
