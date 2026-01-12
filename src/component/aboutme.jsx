import { useState } from "react";
import FrontPage from "./aboutmepages/frontpage.jsx";
import ScrollIndicator from "./scrollIndicator.jsx";
import Hobbies from "./aboutmepages/hobbies.jsx";
import { AnimatePresence, motion } from "framer-motion";

function AboutMe() {
  const [page, setPage] = useState(1);
  const totalPages = 4;

  const handleNextPage = () => {
    console.log("next");
    setPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    console.log("prev");
    setPage((prevPage) => prevPage - 1);
  };
  return (
    <div className="w-[1400px] h-[800px] inset-0 bg-[#18181b] bg-[linear-gradient(to_right,#42198a80_1px,transparent_1px),linear-gradient(to_bottom,#42198a80_1px,transparent_1px)] bg-size-[65px_65px] flexoverflow-y-auto overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {page === 1 && <FrontPage />}
          {page === 2 && <Hobbies />}
        </motion.div>
      </AnimatePresence>

      <ScrollIndicator
        onNext={handleNextPage}
        onPrev={handlePrevPage}
        currentPage={page}
        totalPages={totalPages}
      />
    </div>
  );
}

export default AboutMe;
