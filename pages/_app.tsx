import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyAk98T4r9wdvzC83iu54lb45Rn10Jkz4m8",
//   authDomain: "eki-market.firebaseapp.com",
//   projectId: "eki-market",
//   storageBucket: "eki-market.appspot.com",
//   messagingSenderId: "662894630518",
//   appId: "1:662894630518:web:b63ff6be3f76a8481e7157",
//   measurementId: "G-GBB65FEP2X",
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence>
      <Component {...pageProps} />
    </AnimatePresence>
  );
}
