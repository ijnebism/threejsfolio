import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLink } from "react-icons/fa";

function Experiences() {
  const projects = useMemo(() => [
    {
      id: "vista",
      title: "Vista Group",
      skills: ["React", "React Native", ".NET", "YAML"],
      desc: (
        <>
          <p>
            Vista Group is a leading provider of software solutions for the
            global film industry. I worked as a Software Engineer Intern on the
            Mobile Team, developing and maintaining mobile applications for
            cinema management.
          </p>
          <br />
          <a
            href="https://vistagroup.co.nz/"
            className="inline-flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLink />
          </a>
        </>
      ),
      images: ["/experiences/vista.png"],
    },
    {
      id: "paknsave",
      title: "Pak'n Save",
      skills: ["Customer Service", "Teamwork"],
      desc: (
        <>
          <p>
            Pak'n Save is a leading New Zealand supermarket chain. I worked as a
            Checkout Operator and Store Assistant, providing excellent customer
            service and ensuring smooth store operations.
          </p>
          <br />
          <a
            href="https://www.paknsave.co.nz/"
            className="inline-flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLink />
          </a>
        </>
      ),
      images: ["/experiences/pak.webp"],
    },
  ]);

  const [selectedId, setSelectedId] = useState(projects[0]?.id);
  const selected = projects.find((p) => p.id === selectedId);

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
        <h1 className="text-3xl font-bold mb-6 text-gray-400">Experiences</h1>

        <div className="flex flex-col gap-2">
          {projects.map((p) => {
            const active = p.id === selectedId;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={[
                  "text-left rounded-xl px-4 py-3 transition",
                  "border border-white/10 hover:border-white/20 hover:bg-white/5",
                  active ? "bg-white/10 border-white/25" : "bg-transparent",
                ].join(" ")}
              >
                <div className="font-bold text-xl">{p.title}</div>
                <div className="text-sm text-white/60 line-clamp-1 text-l whitespace-pre-line">
                  {p.desc}
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
                    <div className="flex gap-2 mt-2">
                      {selected.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-sm bg-white/10 px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
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

export default Experiences;
