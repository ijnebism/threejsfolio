import TaskBar from "./component/taskbar";
import DraggableApp from "./component/DraggableApp";
import DraggableWindow from "./component/DraggableWindow";
import { useState } from "react";
import Folder from "./component/Folder";
import AboutMe from "./component/aboutme";
import { techStack as inFolderapps } from "./constants/techStack";
import { CgProfile } from "react-icons/cg";


const apps = [
  {
    id: "TechStack",
    title: "Tech Stack",
    image: "/folder.png",
    content: <Folder apps={inFolderapps} />,
  },
  {
    id: "aboutMe",
    title: "About Me",
    image: "/aboutme.png",
    icon: <CgProfile size={32} />,
    isIconOnly: true,
    content: <AboutMe />,
  },
];

function PCPage({ cameraControllerRef }) {
  const [openmWindows, setOpenmWindows] = useState([]);


  function openApp(id, position) {
    setOpenmWindows((prev) => {
      if (prev.find((app) => app.id === id)) return prev;
      return [...prev, { id, position }];
    });
  }

  function closeApp(id) {
    setOpenmWindows((prev) => prev.filter((app) => app.id !== id));
  }
  return (
    <div className="h-full" style={{ backgroundImage: "url('/bg.png')" }}>
      {apps.map((app) => (
        <DraggableApp
          key={app.id}
          label={app.title}
          initialX={64 * apps.indexOf(app)}
          initialY={12}
          maxX={1820 - 48}
          maxY={1080 - 68 - 72}
          image={app.image}
          isIconOnly={app.isIconOnly}
          icon={app.icon}
          onOpen={(position) => openApp(app.id, position)}
        />
      ))}
      {openmWindows.map((app) => (
        <DraggableWindow
          key={app.id}
          title={apps.find((a) => a.id === app.id)?.title}
          maxX={1820 - 48}
          maxY={1080 - 100}
          initialX={app.position.x + 50}
          initialY={app.position.y + 50}
          image={apps.find((a) => a.id === app.id)?.image}
          isIconOnly={apps.find((a) => a.id === app.id)?.isIconOnly}
          icon={apps.find((a) => a.id === app.id)?.icon}
          onClose={() => closeApp(app.id)}
        >
          {apps.find((a) => a.id === app.id)?.content}
        </DraggableWindow>
      ))}
      <TaskBar cameraControllerRef={cameraControllerRef} />
    </div>
  );
}
export default PCPage;
