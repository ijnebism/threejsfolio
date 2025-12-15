import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

function ScrollIndicator({ isRight, href }) {
  return (
    <>
      {isRight ? (
        <div className="absolute bottom-6 right-1 -translate-x-1/2">
          <div
            className="w-12 h-12 rounded-full border-2 border-[#ffffff] flex items-center justify-center cursor-pointer"
            href={href}
          >
            <FaAngleRight size={24} color="#ffffff" className="animate-pulse" />
          </div>
        </div>
      ) : (
        <div className="absolute bottom-6 left-1 translate-x-1/2">
          <div
            className="w-12 h-12 rounded-full border-2 border-[#ffffff] flex items-center justify-center cursor-pointer"
            href={href}
          >
            <FaAngleLeft size={24} color="#ffffff" className="animate-pulse" />
          </div>
        </div>
      )}
    </>
  );
}

export default ScrollIndicator;
