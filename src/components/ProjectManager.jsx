import React, { useState } from "react";
import { useRealtime } from "../hooks/useRealtime";
import { supabase } from "../supabase/supabaseClient";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Check,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";

const ProjectManager = () => {
  const { data: projects, loading } = useRealtime("projects");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech_stack: "",
    image_url: "",
    github_link: "",
    live_link: "",
  });
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        ...project,
        tech_stack: Array.isArray(project.tech_stack)
          ? project.tech_stack.join(", ")
          : typeof project.tech_stack === "string"
            ? project.tech_stack
            : "",
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        tech_stack: "",
        image_url: "",
        github_link: "",
        live_link: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await supabase.from("projects").delete().eq("id", id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const projectData = {
      ...formData,
      tech_stack: formData.tech_stack
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== ""),
    };

    if (editingProject) {
      await supabase
        .from("projects")
        .update(projectData)
        .eq("id", editingProject.id);
    } else {
      await supabase.from("projects").insert([projectData]);
    }

    setSubmitting(false);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Projects</h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary-light hover:bg-primary-dark text-dark px-4 py-2 rounded-xl flex items-center font-bold transition-all"
        >
          <Plus className="mr-2 w-5 h-5" /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading
          ? [1, 2, 3].map((i) => (
              <div key={i} className="h-64 glass animate-pulse rounded-2xl" />
            ))
          : projects.map((p) => (
              <div
                key={p.id}
                className="glass p-4 rounded-2xl flex flex-col h-full group"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                  <img
                    src={p.image_url || "https://via.placeholder.com/400x225"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                    <button
                      onClick={() => handleOpenModal(p)}
                      className="p-3 bg-white text-dark rounded-full hover:scale-110 transition-transform"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{p.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                  {p.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-1">
                  {Array.isArray(p.tech_stack)
                    ? p.tech_stack.map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-slate-200 dark:bg-dark-lighter text-[10px] rounded-md font-medium"
                        >
                          {t}
                        </span>
                      ))
                    : typeof p.tech_stack === "string"
                      ? p.tech_stack.split(",").map((t, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-slate-200 dark:bg-dark-lighter text-[10px] rounded-md font-medium"
                          >
                            {t.trim()}
                          </span>
                        ))
                      : null}
                </div>
              </div>
            ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-dark/60 backdrop-blur-sm animate-fade-in">
          <div className="glass w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-8 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-dark-lighter rounded-full"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold mb-8">
              {editingProject ? "Edit Project" : "New Project"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Project Title
                  </label>
                  <input
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border dark:border-slate-800 bg-transparent"
                    placeholder="E-commerce Dashboard"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    required
                    rows="3"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border dark:border-slate-800 bg-transparent resize-none"
                    placeholder="Brief overview..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Image URL
                  </label>
                  <input
                    value={formData.image_url}
                    onChange={(e) =>
                      setFormData({ ...formData, image_url: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border dark:border-slate-800 bg-transparent"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    value={formData.tech_stack}
                    onChange={(e) =>
                      setFormData({ ...formData, tech_stack: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border dark:border-slate-800 bg-transparent"
                    placeholder="React, Tailwind, Supabase"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Github Link
                  </label>
                  <input
                    value={formData.github_link}
                    onChange={(e) =>
                      setFormData({ ...formData, github_link: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border dark:border-slate-800 bg-transparent"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Live Link
                  </label>
                  <input
                    value={formData.live_link}
                    onChange={(e) =>
                      setFormData({ ...formData, live_link: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border dark:border-slate-800 bg-transparent"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  disabled={submitting}
                  type="submit"
                  className="flex-1 bg-primary-light text-dark font-bold py-3 rounded-xl disabled:opacity-50"
                >
                  {submitting ? (
                    <Loader2 className="animate-spin mx-auto" />
                  ) : editingProject ? (
                    "Save Changes"
                  ) : (
                    "Create Project"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 glass font-bold py-3 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
