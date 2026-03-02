import React, { useState } from "react";
import { useRealtime } from "../hooks/useRealtime";
import { supabase } from "../supabase/supabaseClient";
import { Plus, Edit2, Trash2, X, Loader2 } from "lucide-react";

const TestimonialManager = () => {
  const { data: testimonials, loading } = useRealtime("testimonials");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    review: "",
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
      setFormData({ name: "", company: "", review: "" });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this testimonial?")) {
      await supabase.from("testimonials").delete().eq("id", id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (editing)
      await supabase.from("testimonials").update(formData).eq("id", editing.id);
    else await supabase.from("testimonials").insert([formData]);
    setSubmitting(false);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Testimonials</h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary-light text-dark px-4 py-2 rounded-xl font-bold"
        >
          Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? [1, 2, 3].map((i) => (
              <div key={i} className="h-40 glass animate-pulse rounded-2xl" />
            ))
          : testimonials.map((t) => (
              <div key={t.id} className="glass p-6 rounded-2xl relative group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold">{t.name}</h3>
                    <p className="text-sm text-slate-500">{t.company}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleOpenModal(t)}
                      className="p-2 text-slate-400 hover:text-primary-light"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="p-2 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm italic line-clamp-3">"{t.review}"</p>
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
              {editing ? "Edit Testimonial" : "New Testimonial"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full glass p-3 rounded-xl outline-none"
                placeholder="Client Name"
              />
              <input
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full glass p-3 rounded-xl outline-none"
                placeholder="Company Name"
              />
              <textarea
                required
                rows="4"
                value={formData.review}
                onChange={(e) =>
                  setFormData({ ...formData, review: e.target.value })
                }
                className="w-full glass p-3 rounded-xl outline-none resize-none"
                placeholder="The Review..."
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

export default TestimonialManager;
