import { useState } from "react";

function Notes() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields.");
      return;
    }
    alert("Message sent!");
    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <form className="w-[700px] h-[600px] text-black " onSubmit={handleSubmit}>
      <div className="flex">
        <h1 className="w-1/2 text-2xl">Name:</h1>
        <h1 className="w-1/2 text-2xl">Email:</h1>
      </div>
      <div className="flex my-4">
        <input
          id="name"
          name="name"
          value={form.name}
          type="text"
          onChange={handleChange}
          className="w-1/2 bg-black/10 text-xl pl-2 text-black mr-10 outline-none"
          placeholder="Name"
        />
        <input
          id="email"
          name="email"
          value={form.email}
          type="email"
          onChange={handleChange}
          className="w-1/2 bg-black/10 text-xl pl-2 text-black mr-10 outline-none"
          placeholder="Email"
        />
      </div>
      <div className="flex flex-col mt-4">
        <h1 className="text-2xl mb-4">Message:</h1>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          className="w-full h-80 bg-black/10 text-xl pl-2 text-black outline-none pt-2"
          placeholder="Message"
        ></textarea>
      </div>
      <button className="mt-4 mx-auto block px-4 py-2 text-xl hover:cursor-pointer">
        Submit
      </button>
    </form>
  );
}

export default Notes;
