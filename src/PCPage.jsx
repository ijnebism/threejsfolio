import TaskBar from "./component/taskbar";
import DraggableApp from "./component/DraggableApp";
import DraggableWindow from "./component/DraggableWindow";
import { useState } from "react";
import Folder from "./component/Folder";

const inFolderapps = [
  {
    id: "React",
    label: "React",
    image: "/react.png",
    initialX: 16,
    initialY: 16,
  },
];

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
    content: <div>About Me Application Content</div>,
  },
];

function PCPage() {
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
          onClose={() => closeApp(app.id)}
        >
          {apps.find((a) => a.id === app.id)?.content}
        </DraggableWindow>
      ))}
      <TaskBar />
    </div>
  );
}
export default PCPage;
