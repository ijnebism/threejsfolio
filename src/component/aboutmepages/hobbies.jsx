import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Hobbies() {
  const hobbies = useMemo(
    () => [
      {
        id: "music",
        title: "Music",
        desc: "I enjoy playing music ",
        images: [],
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState(hobbies[0]?.id);
  const selected = hobbies.find((h) => h.id === selectedId);

  return (
    <div className="flex h-[750px] pt-20 px-25 gap-8 text-white">
      <div className="w-[320px]">
        <h1 className="text-3xl font-bold mb-6 text-gray-400">Hobbies</h1>

        <div className="flex flex-col gap-2">
          {hobbies.map((h) => {
            const active = h.id === selectedId;
            return (
              <button
                key={h.id}
                onClick={() => setSelectedId(h.id)}
                className={[
                  "text-left rounded-xl px-4 py-3 transition",
                  "border border-white/10 hover:border-white/20 hover:bg-white/5",
                  active ? "bg-white/10 border-white/25" : "bg-transparent",
                ].join(" ")}
              >
                <div className="font-bold text-xl">{h.title}</div>
                <div className="text-sm text-white/60 line-clamp-1 text-l">
                  {h.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 rounded-2xl p-6 overflow-hidden">
        <AnimatePresence mode="wait">
          {!selected ? (
            <div className="text-white/60 text-xl">Select a hobby</div>
          ) : (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 40, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.9 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="h-full flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold">{selected.title}</h2>
                    <p className="mt-2 text-white/70 max-w-[700px] text-xl">
                      {selected.desc}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  {selected.images?.map((src, i) => (
                    <div
                      key={src + i}
                      className="rounded-xl overflow-hidden border border-white/10 bg-black/20"
                    >
                      <img
                        src={src}
                        alt={`${selected.title} ${i + 1}`}
                        className="w-full h-60 object-cover"
                        loading="lazy"
                      />
                      <div className="p-3 text-sm text-white/60">
                        {selected.title} — photo {i + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Hobbies;
