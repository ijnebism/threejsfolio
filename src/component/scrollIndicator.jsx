import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

function ScrollIndicator({ onNext, onPrev, currentPage, totalPages }) {
  return (
    <>
      {currentPage < totalPages && (
        <div className="absolute right-1 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-12 h-12 rounded-full border-2 border-[#ffffff] flex items-center justify-center cursor-pointer"
            onClick={onNext}
          >
            <FaAngleRight size={24} color="#ffffff" className="animate-pulse" />
          </div>
        </div>
      )}
      {currentPage > 1 && (
        <div className="absolute left-1 top-1/2 translate-x-1/2 -translate-y-1/2">
          <div
            className="w-12 h-12 rounded-full border-2 border-[#ffffff] flex items-center justify-center cursor-pointer"
            onClick={onPrev}
          >
            <FaAngleLeft size={24} color="#ffffff" className="animate-pulse" />
          </div>
        </div>
      )}
    </>
  );
}

export default ScrollIndicator;
