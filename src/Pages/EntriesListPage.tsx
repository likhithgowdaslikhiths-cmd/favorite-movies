import { useEffect, useState } from "react";
import axios from "axios";

type Entry = {
  id: number;
  title: string;
  type: string;
  director: string;
  budget: string;
  location: string;
  duration: string;
  yearTime: string;
};

const EntriesListPage = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [mode, setMode] = useState<"view" | "add" | "edit">("view");
  const [form, setForm] = useState<Omit<Entry, "id">>({
    title: "",
    type: "",
    director: "",
    budget: "",
    location: "",
    duration: "",
    yearTime: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch entries
  const fetchEntries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/entries");
      setEntries(res.data.entries);
    } catch (err) {
      console.error("Error fetching entries:", err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/entries", form);
    alert("✅ Entry added!");
    fetchEntries();
    setForm({
      title: "",
      type: "",
      director: "",
      budget: "",
      location: "",
      duration: "",
      yearTime: "",
    });
    setMode("view");
  };

  const handleEditClick = (entry: Entry) => {
    setMode("edit");
    setEditId(entry.id);
    setForm({
      title: entry.title,
      type: entry.type,
      director: entry.director,
      budget: entry.budget,
      location: entry.location,
      duration: entry.duration,
      yearTime: entry.yearTime,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    await axios.put(`http://localhost:5000/api/entries/${editId}`, form);
    alert("✏️ Entry updated!");
    fetchEntries();
    setEditId(null);
    setMode("view");
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this entry?")) {
      await axios.delete(`http://localhost:5000/api/entries/${id}`);
      alert("🗑️ Entry deleted!");
      fetchEntries();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600 flex items-center justify-center gap-2">
        🎬 Favorite Movies & TV Shows
      </h1>

      {/* Action Buttons */}
      <div className="flex justify-center mb-6 gap-4">
        <button
          onClick={() => setMode("view")}
          className={`px-4 py-2 rounded text-white ${
            mode === "view" ? "bg-blue-600" : "bg-gray-400"
          }`}
        >
          View Entries
        </button>
        <button
          onClick={() => setMode("add")}
          className={`px-4 py-2 rounded text-white ${
            mode === "add" ? "bg-blue-600" : "bg-gray-400"
          }`}
        >
          Add Entry
        </button>
        <button
  onClick={() => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }}
  className="absolute top-6 right-6 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
>
  Logout
</button>

      </div>

      {/* Add Form */}
      {mode === "add" && (
        <form
          onSubmit={handleAdd}
          className="bg-white p-6 rounded shadow-md mb-6 max-w-4xl mx-auto grid grid-cols-2 gap-3"
        >
          {Object.entries(form).map(([key, value]) => (
            <input
              key={key}
              name={key}
              value={value}
              onChange={handleChange}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="border px-3 py-2 rounded"
              required
            />
          ))}
          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </form>
      )}

      {/* Edit Form */}
      {mode === "edit" && (
        <form
          onSubmit={handleUpdate}
          className="bg-white p-6 rounded shadow-md mb-6 max-w-4xl mx-auto grid grid-cols-2 gap-3"
        >
          {Object.entries(form).map(([key, value]) => (
            <input
              key={key}
              name={key}
              value={value}
              onChange={handleChange}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="border px-3 py-2 rounded"
              required
            />
          ))}
          <button
            type="submit"
            className="col-span-2 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
          >
            Update Entry
          </button>
        </form>
      )}

      {/* Table */}
      <div className="bg-white rounded shadow-md overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Director</th>
              <th className="p-2 text-left">Budget</th>
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-left">Duration</th>
              <th className="p-2 text-left">Year/Time</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{entry.title}</td>
                <td className="p-2">{entry.type}</td>
                <td className="p-2">{entry.director}</td>
                <td className="p-2">{entry.budget}</td>
                <td className="p-2">{entry.location}</td>
                <td className="p-2">{entry.duration}</td>
                <td className="p-2">{entry.yearTime}</td>
                <td className="p-2 text-center space-x-2">
                  <button
                    onClick={() => handleEditClick(entry)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {entries.length === 0 && (
          <p className="text-center p-4 text-gray-500">
            No entries found. Add some!
          </p>
        )}
      </div>
    </div>
  );
};

export default EntriesListPage;
