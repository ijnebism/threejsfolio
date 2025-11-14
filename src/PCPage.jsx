import TaskBar from "./component/taskbar";
import DraggableApp from "./component/DraggableApp";
import DraggableWindow from "./component/DraggableWindow";
import { useState } from "react";

const apps = [
  {
    id: "myApp",
    title: "My Application",
    icon: "/appicon.png",
    content: <div>Welcome to My Application! ipsum dolor sit amet</div>,
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
      <DraggableApp
        label="My App"
        initialX={0}
        initialY={0}
        maxX={1820 - 48}
        maxY={1080 - 68 - 72}
        onOpen={(position) => openApp("myApp", position)}
      />
      {openmWindows.map((app) => (
        <DraggableWindow
          key={app.id}
          title={apps.find((a) => a.id === app.id)?.title}
          maxX={1820 - 200}
          maxY={1080 - 100}
          initialX={app.position.x + 50}
          initialY={app.position.y + 50}
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
