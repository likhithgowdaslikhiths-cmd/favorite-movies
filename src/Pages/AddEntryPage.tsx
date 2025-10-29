import { useState } from "react";
import axios from "axios";

const AddEntryPage = () => {
  const [form, setForm] = useState({
    title: "",
    type: "",
    director: "",
    budget: "",
    location: "",
    duration: "",
    yearTime: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/entries", form);
      alert("✅ Entry saved successfully!");
      setForm({
        title: "",
        type: "",
        director: "",
        budget: "",
        location: "",
        duration: "",
        yearTime: "",
      });
    } catch (error) {
      console.error(error);
      alert("❌ Failed to save entry");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          🎬 Add Movie / TV Show
        </h2>

        {Object.entries(form).map(([key, value]) => (
          <input
            key={key}
            name={key}
            value={value}
            onChange={handleChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddEntryPage;
