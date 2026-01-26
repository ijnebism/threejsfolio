import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Hobbies() {
  const hobbies = useMemo(
    () => [
      {
        id: "music",
        title: "Music",
        desc: (
          <>
            <p>
              I enjoy playing music in my free time! I play multiple instruments
              including the clarinet, saxophone, piano and guitar. I
              particularly enjoy jazz and classical music.
            </p>
            <br />
            <p>
              I have been part of various school bands and orchestras throughout
              my life, and I find playing music to be a great way to relax and
              express creativity.
            </p>
            <br />
            <p>
              I have led many groups as a section leader and have also arranged
              multiple meetings and rehearsals for my peers.
            </p>
          </>
        ),
        images: [
          "/hobbies/music/music1.jpg",
          "/hobbies/music/music2.jpg",
          "/hobbies/music/music3.jpg",
        ],
      },
      {
        id: "bouldering",
        title: "Bouldering",
        desc: (
          <>
            <p>
              I enjoy bouldering as a fun and challenging physical activity. It
              requires strength, problem-solving skills, and mental focus.
            </p>
            <br />
            <p>
              I often go with friends to local climbing gyms. It is a great way
              to stay active and socialize.
            </p>
            <br />
          </>
        ),
        images: ["/hobbies/bouldering/bouldering2.jpg"],
      },
    ],
    [],
  );

  const [selectedId, setSelectedId] = useState(hobbies[0]?.id);
  const selected = hobbies.find((h) => h.id === selectedId);

  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImageIndex(0);
  }, [selectedId]);

  useEffect(() => {
    if (!selected || !selected.images || selected.images.length <= 1) return;
    const interval = setInterval(() => {
      setImageIndex((i) => (i + 1) % selected.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [selected]);

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
                <div className="text-sm text-white/60 line-clamp-1 text-l whitespace-pre-line">
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
              initial={{ opacity: 0, x: 40, scale: 1 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full"
            >
              <div className="h-full flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold w-full">
                      {selected.title}
                    </h2>
                    <p className="mt-2 text-white/70 w-full text-xl">
                      {selected.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 relative flex-1 w-full">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selected.images[imageIndex]}
                      src={selected.images[imageIndex]}
                      alt={`${selected.title} ${imageIndex + 1}`}
                      className="absolute inset-0 w-full h-full object-cover rounded-xl border border-white/10"
                      initial={{ opacity: 0, scale: 1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </AnimatePresence>
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
