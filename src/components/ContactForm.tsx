// src/components/ContactForm.tsx
"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    alert("Thank you for your message!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 font-semibold">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md"
        />
      </div>
      <div>
        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md"
        />
      </div>
      <div>
        <label className="block mb-2 font-semibold">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md"
          rows={5}
        />
      </div>
      <button
        type="submit"
        className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
      >
        Send Message
      </button>
    </form>
  );
}
