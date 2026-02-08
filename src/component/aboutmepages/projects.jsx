import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaYoutube } from "react-icons/fa";

function Projects() {
  const projects = useMemo(() => [
    {
      id: "threejsFolio",
      title: "Personal Portfolio Website",
      skills: ["React", "Three.js", "Framer Motion", "Blender"],
      desc: (
        <>
          <p>
            This portfolio website is built using React and Three.js to showcase
            my skills and projects in an interactive 3D environment.
          </p>
          <br />
          <p>
            It features a desktop-like interface where users can explore
            different folders representing various aspects of my work and
            hobbies.
          </p>
          <br />
          <a
            href="https://github.com/ijnebism/threejsfolio"
            className="inline-flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </>
      ),
      images: ["/projects/portfolio1.png", "/projects/portfolio2.png"],
    },
    {
      id: "vrcycle",
      title: "VR Cycling Safety Simulator",
      skills: ["Unity", "C#", "VR Development", "Blender"],
      desc: (
        <>
          <p>
            Created a VR bicycle simulator to support controlled human factors
            research. This included refining environmental variables such as
            traffic density and road layout, and integrating spatialised ambient
            audio to examine its effect on cyclist safety perception.
          </p>
        </>
      ),
      images: ["/projects/vrbike1.png", "/projects/vrbike2.png"],
    },
    {
      id: "beatweights",
      title: "BeatWeights",
      skills: ["Unity", "C#", "VR Development"],
      desc: (
        <>
          <p>
            Beat Weights is a VR exergame that combines music, rhythm, and
            strength training to make workouts more engaging and motivating.
          </p>
          <br />
          <p>
            Players perform strength exercises in time with music, earning
            feedback and scores based on timing and accuracy.
          </p>
          <br />
          <a
            href="https://github.com/ijnebism/beat-weight"
            className="inline-flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.youtube.com/watch?v=0rdosLRMJwE"
            className="inline-flex items-center ml-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
        </>
      ),
      images: ["/projects/beatweights1.png"],
    },
    {
      id: "Gamehub",
      title: "GameHub",
      skills: ["React", "Node.js", "MongoDB", "Express", "Jest"],
      desc: (
        <>
          <p>
            A real-time multiplayer implementation of the classic social
            deduction game Mafia, built using modern web technologies.
          </p>
          <br />
          <p>
            What sets our implementation apart is the integration of modern
            features like voice chat using WebRTC, real-time game state
            management and configurable game states
          </p>
        </>
      ),
      images: ["/projects/gamehub1.png", "/projects/gamehub2.png"],
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
        <h1 className="text-3xl font-bold mb-6 text-gray-400">Projects</h1>

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

export default Projects;
