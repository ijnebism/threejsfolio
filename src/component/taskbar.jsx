import React, { useEffect, useRef, useState } from "react";
import Calendar from "./calender";
import { AnimatePresence, motion } from "framer-motion";
import { FaBluesky } from "react-icons/fa6";
import { useCameraControl } from "../CameraControllerContext.js";

function TaskBar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const calendarRef = useRef(null); // ref to detect outside click
  const startRef = useRef(null);
  const { resetCamera } = useCameraControl();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // click outside handler
    function handleClickOutside(event) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        !event.target.closest(".time-area") // allow clicking the time to toggle
      ) {
        setCalendarOpen(false);
      }

      if (
        startRef.current &&
        !startRef.current.contains(event.target) &&
        !event.target.closest(".start-area") // allow clicking the start area to toggle
      ) {
        setStartOpen(false);
      }
    }

    if (calendarOpen || startOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarOpen, startOpen]);

  return (
    <div className="h-18 bg-gray-700 text-white flex items-center absolute bottom-0 w-full">
      {/* Start */}
      <div
        onClick={() => setStartOpen(!startOpen)}
        className="start-area cursor-default hover:bg-gray-600 absolute left-0 h-full items-center align-middle flex"
      >
        <div className="mx-4 text-center text-4xl">
          <h1>
            <FaBluesky />
          </h1>
        </div>
      </div>
      <AnimatePresence>
        {startOpen && (
          <motion.div
            ref={startRef}
            key="start"
            initial={{ y: 20, opacity: 0 }} // start slightly below
            animate={{ y: 0, opacity: 1 }} // slide up into place
            exit={{ y: 20, opacity: 0 }} // slide down when closing
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute left-0 bottom-0"
          >
            <div
              onClick={() => {
                resetCamera();
                console.log("Camera reset");
              }}
              className="bg-gray-600 bottom-18 absolute w-50 text-2xl p-4 cursor-default"
            >
              Back
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendar */}
      <div
        onClick={() => setCalendarOpen(!calendarOpen)}
        className="time-area cursor-default hover:bg-gray-600 absolute right-0 h-full items-center align-middle flex"
      >
        <div className="mx-4 text-center">
          <div className="text-md">{currentDate.toLocaleTimeString()}</div>
          <div className="text-md">{currentDate.toLocaleDateString()}</div>
        </div>
      </div>
      <AnimatePresence>
        {calendarOpen && (
          <motion.div
            ref={calendarRef}
            key="calendar"
            initial={{ y: 20, opacity: 0 }} // start slightly below
            animate={{ y: 0, opacity: 1 }} // slide up into place
            exit={{ y: 20, opacity: 0 }} // slide down when closing
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute right-0 bottom-0"
          >
            <Calendar date={currentDate} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TaskBar;
