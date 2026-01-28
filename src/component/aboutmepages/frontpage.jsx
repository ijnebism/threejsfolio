function FrontPage() {
  return (
    <>
      <div className="flex h-[800px] items-center">
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
            Software developer based in Auckland, New Zealand.
          </p>
        </div>
      </div>
    </>
  );
}

export default FrontPage;
