import { useState } from "react";
import emailjs from "@emailjs/browser";
import { i } from "framer-motion/client";

function Notes() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "", // "error" | "success"
    message: "",
  });

  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // clear message while typing
    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus({
        type: "error",
        message: "Please fill in all fields before submitting.",
      });
      return;
    }

    setIsSending(true);
    setStatus({ type: "", message: "" });

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setStatus({
        type: "success",
        message: "Message sent successfully!",
      });

      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form className="w-[700px] h-[600px] text-black" onSubmit={handleSubmit}>
      <div className="flex">
        <h1 className="w-1/2 text-2xl">Name:</h1>
        <h1 className="w-1/2 text-2xl">Email:</h1>
      </div>

      <div className="flex my-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-1/2 bg-black/10 text-xl pl-2 mr-10 outline-none"
          placeholder="Name"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-1/2 bg-black/10 text-xl pl-2 mr-10 outline-none"
          placeholder="Email"
        />
      </div>

      <div className="flex flex-col mt-4">
        <h1 className="text-2xl mb-4">Message:</h1>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          className="w-full h-80 bg-black/10 text-xl pl-2 outline-none pt-2 resize-none"
          placeholder="Message"
        />
      </div>

      <button
        type="submit"
        disabled={isSending}
        className="mt-4 mx-auto block px-4 py-2 text-xl disabled:opacity-50"
      >
        {isSending ? "Sending..." : "Submit"}
      </button>
      {/* Status message */}
      {status.message && (
        <p
          className={`mt-4 text-center text-xl ${
            status.type === "error" ? "text-red-500" : "text-green-600"
          }`}
        >
          {status.message}
        </p>
      )}
    </form>
  );
}

export default Notes;
