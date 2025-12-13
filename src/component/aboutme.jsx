function AboutMe() {
  return (
    <div className="w-[1400px] h-[800px] inset-0 bg-[#18181b] bg-[linear-gradient(to_right,#42198a80_1px,transparent_1px),linear-gradient(to_bottom,#42198a80_1px,transparent_1px)] bg-size-[75px_75px] overflow-auto">
      <div className="flex min-h-[800px] items-center">
        <div className="m-8 w-3/5 flex justify-center pl-16">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="h-[495px] w-[352px] object-fill rounded-lg"
          />
        </div>
        <div className="w-full flex flex-col text-white">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="mb-4">
            Hello! I'm Benjamin Qian, a passionate software developer with a
            love for creating innovative solutions. I specialize in web
            development and have experience working with various technologies
            including React, Node.js, and Python.
          </p>
        </div>
      </div>
      <div>
        <h2 className="text-white text-2xl font-bold mb-4 ml-8">Skills</h2>
      </div>
    </div>
  );
}

export default AboutMe;
