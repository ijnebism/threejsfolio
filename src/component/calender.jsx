import React, { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [direction, setDirection] = useState(0); // -1 prev, +1 next
  const today = new Date();

  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setDirection(+1);
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const buildCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const lastOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = lastOfMonth.getDate();
    const startDayMon0 = (firstOfMonth.getDay() + 6) % 7; // Monday=0..Sunday=6
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const cells = [];

    for (let i = startDayMon0 - 1; i >= 0; i--) {
      const d = prevMonthLastDay - i;
      cells.push({ date: new Date(year, month - 1, d), inCurrentMonth: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: new Date(year, month, d), inCurrentMonth: true });
    }
    while (cells.length < 42) {
      const nextIndex = cells.length - (startDayMon0 + daysInMonth) + 1;
      cells.push({
        date: new Date(year, month + 1, nextIndex),
        inCurrentMonth: false,
      });
    }
    return cells;
  };

  const cells = buildCalendar();

  // Motion variants depend on direction: next month slides up, prev slides down
  const panelVariants = {
    enter: (dir) => ({ y: dir > 0 ? 20 : -20, opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (dir) => ({ y: dir > 0 ? -20 : 20, opacity: 0 }),
  };

  const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

  return (
    <div className="bg-gray-800 text-white absolute right-0 w-80 bottom-18 p-4 cursor-default overflow-hidden shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1>
          {currentDate.toLocaleString("en-EN", {
            month: "long",
            year: "numeric",
          })}
        </h1>

        <div className="flex items-center">
          <button
            onClick={handlePrevMonth}
            aria-label="Previous month"
            className="p-1 hover:bg-gray-800"
          >
            <FaChevronUp />
          </button>
          <button
            onClick={handleNextMonth}
            aria-label="Next month"
            className="p-1 hover:bg-gray-800"
          >
            <FaChevronDown />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center font-bold mb-2">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="relative h-[220px]">
        {" "}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={monthKey}
            custom={direction}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.2 }}
            className="grid grid-cols-7 gap-2 text-center absolute inset-0"
          >
            {cells.map(({ date, inCurrentMonth }, i) => {
              const isToday =
                date.getFullYear() === today.getFullYear() &&
                date.getMonth() === today.getMonth() &&
                date.getDate() === today.getDate();

              return (
                <div
                  key={i}
                  className={[
                    "py-2",
                    inCurrentMonth ? "hover:bg-gray-700" : "text-gray-400",
                    isToday && inCurrentMonth ? "bg-blue-500 font-bold" : "",
                  ].join(" ")}
                  title={date.toDateString()}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Calendar;
