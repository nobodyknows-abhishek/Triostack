import React from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  Users,
  Star,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

import ProjectManager from "../components/ProjectManager";
import TestimonialManager from "../components/TestimonialManager";
import TeamManager from "../components/TeamManager";
import MessageInbox from "../components/MessageInbox";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const menuItems = [
    { name: "Overview", path: "/admin/dashboard", icon: <LayoutDashboard /> },
    {
      name: "Projects",
      path: "/admin/dashboard/projects",
      icon: <Briefcase />,
    },
    {
      name: "Testimonials",
      path: "/admin/dashboard/testimonials",
      icon: <Star />,
    },
    { name: "Team", path: "/admin/dashboard/team", icon: <Users /> },
    {
      name: "Inbox",
      path: "/admin/dashboard/messages",
      icon: <MessageSquare />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-dark pt-16">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-white/10 hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Navigation
          </h2>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                location.pathname === item.path
                  ? "bg-primary-light text-dark shadow-lg shadow-primary-light/30"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-lighter"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
              {location.pathname === item.path && (
                <ChevronRight className="ml-auto w-4 h-4" />
              )}
            </Link>
          ))}
        </nav>
        <div className="p-6">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl font-medium transition-all"
          >
            <LogOut className="mr-3 w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Overview menuItems={menuItems} />} />
          <Route path="/projects" element={<ProjectManager />} />
          <Route path="/testimonials" element={<TestimonialManager />} />
          <Route path="/team" element={<TeamManager />} />
          <Route path="/messages" element={<MessageInbox />} />
        </Routes>
      </main>
    </div>
  );
};

const Overview = ({ menuItems }) => (
  <div>
    <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {menuItems.slice(1).map((item, i) => (
        <Link
          key={i}
          to={item.path}
          className="glass p-8 rounded-3xl hover:scale-105 transition-all text-center group"
        >
          <div className="w-16 h-16 bg-primary-light/10 text-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform">
            {React.cloneElement(item.icon, { size: 32 })}
          </div>
          <h3 className="text-xl font-bold">{item.name}</h3>
          <p className="text-sm text-slate-500 mt-2">
            Manage your {item.name.toLowerCase()}
          </p>
        </Link>
      ))}
    </div>
  </div>
);

export default AdminDashboard;
