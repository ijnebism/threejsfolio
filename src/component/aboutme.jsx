import ScrollIndicator from "./scrollIndicator.jsx";

function AboutMe() {
  return (
    <div className="w-[1400px] h-[800px] inset-0 bg-[#18181b] bg-[linear-gradient(to_right,#42198a80_1px,transparent_1px),linear-gradient(to_bottom,#42198a80_1px,transparent_1px)] bg-size-[65px_65px] flexoverflow-y-auto overflow-x-hidden">
      <div className="h-[800px]">
        <div className="flex h-[750px] items-center">
          <div className="m-8 w-3/5 flex pl-16 justify-end">
            <img
              src="/profile.jpg"
              alt="Profile"
              className="h-[495px] w-[352px] object-fill rounded-lg p-0 m-0"
            />
          </div>
          <div className="w-full flex flex-col text-white h-full pt-37">
            <h1 className="text-3xl font-bold mb-4 text-gray-400">
              I'm Benjamin Qian
            </h1>
            <p className="mb-4 text-5xl mr-15 pt-30">
              Frontend developer based in Auckland, New Zealand.
            </p>
          </div>
        </div>
        <p className="text-white text-lg text-center mb-4 mt-auto">
          This is a page for my hobbies outside of software, if you want my
          skills explore the desktop apps!
        </p>
        <ScrollIndicator isRight={true} href={"#hobbies"} />
      </div>
      <div className="bg-black border-t-8 border-[#42198a]" id="hobbies">
        <h2 className="text-white text-3xl font-bold ml-8 p-4">Hobbies</h2>
      </div>
    </div>
  );
}

export default AboutMe;
