import { Icon, InlineIcon } from "@iconify/react";
import Image from "next/legacy/image";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const IndexPage = () => {
  const router = useRouter();
  return (
    <>
      <Layout title="Home | Eki Marketplace">
        <div className="max-w-[1768px] font-bold w-[90%] my-0 mt-4 mx-auto text-center flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-['PlayfairDisplay-Black'] font-black leading-[40px] sm:leading-[60px]">
            Welcome to the
          </h1>
          <h1 className="text-3xl md:text-5xl font-['PlayfairDisplay-Black'] font-black leading-[40px] sm:leading-[60px] flex items-center text-center flex-wrap max-w-[90%] justify-center">
            <Icon icon="la:slack-hash" />1 Biggest&nbsp;
            <span className="text-[#09B82E]">African</span> Wholesale&nbsp;
            <span className="text-[#09B82E]">Marketplace</span>
          </h1>
          <h3 className="text-2xl font-['Poppins', sans-serif] max-w-[800px] leading-[40px] mt-[30px] font-normal">
            Bringing bulk African varieties to your door at wholesale pricing,
            low-cost shipping & speedy delivery in 3 easy clicks.
          </h3>
          <div className="h-[80px] my-4 flex items-center">
            <motion.button
              animate={{ scale: 1.3 }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-[#000] text-[#fff] flex p-2 px-6 items-center rounded"
              onClick={() => router.push("/purchase")}
            >
              <InlineIcon icon="ic:baseline-play-circle" className="mr-3" />
              Play to <span className="text-[#FFC727]">&nbsp;WIN</span>
            </motion.button>
          </div>
          <Image
            alt="People smiling"
            src="/assets/peoplegif.gif"
            width={800}
            height={500}
            layout="intrinsic"
          />
        </div>
      </Layout>
    </>
  );
};

export default IndexPage;
