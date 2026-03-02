import React, { useState } from "react";
import { useRealtime } from "../hooks/useRealtime";
import { supabase } from "../supabase/supabaseClient";
import { Plus, Edit2, Trash2, Loader2, X } from "lucide-react";

const TeamManager = () => {
  const { data: team, loading } = useRealtime("team");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image_url: "",
  });
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) window.addEventListener("keydown", handleKeyDown);
    else window.removeEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditing(item);
      setFormData(item);
    } else {
      setEditing(null);
      setFormData({ name: "", role: "", image_url: "" });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Remove team member?")) {
      await supabase.from("team").delete().eq("id", id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (editing)
      await supabase.from("team").update(formData).eq("id", editing.id);
    else await supabase.from("team").insert([formData]);
    setSubmitting(false);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Team</h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary-light text-dark px-4 py-2 rounded-xl font-bold"
        >
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? [1, 2].map((i) => (
              <div key={i} className="h-40 glass animate-pulse rounded-2xl" />
            ))
          : team.map((m) => (
              <div
                key={m.id}
                className="glass p-6 rounded-2xl text-center group"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-primary-light/20">
                  <img
                    src={m.image_url || "https://via.placeholder.com/150"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold">{m.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{m.role}</p>
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => handleOpenModal(m)}
                    className="p-2 glass text-primary-light hover:bg-primary-light hover:text-dark rounded-lg transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="p-2 glass text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-dark/60 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="glass w-full max-w-lg rounded-[2.5rem] p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-dark-lighter rounded-full"
            >
              <X />
            </button>
            <h2 className="text-2xl font-bold mb-6">
              {editing ? "Edit Member" : "New Member"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full glass p-3 rounded-xl outline-none"
                placeholder="Name"
              />
              <input
                required
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full glass p-3 rounded-xl outline-none"
                placeholder="Role (e.g. Lead Dev)"
              />
              <input
                value={formData.image_url}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
                className="w-full glass p-3 rounded-xl outline-none"
                placeholder="Image URL"
              />
              <button
                disabled={submitting}
                type="submit"
                className="w-full bg-primary-light text-dark font-bold py-3 rounded-xl"
              >
                {submitting ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : (
                  "Save"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManager;
