import React, { useState } from "react";
import { useRealtime } from "../hooks/useRealtime";
import { supabase } from "../supabase/supabaseClient";
import {
  Mail,
  Check,
  MessageCircle,
  Send,
  Trash2,
  Loader2,
  ArrowUpRight,
} from "lucide-react";

const MessageInbox = () => {
  const { data: messages, loading } = useRealtime("messages");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  const handleReply = async (e) => {
    e.preventDefault();
    setSending(true);

    // Call Supabase Edge Function (Mocked for now as we haven't deployed it)
    const { data, error } = await supabase.functions.invoke("send-reply", {
      body: {
        email: selectedMessage.email,
        message: replyText,
        name: selectedMessage.name,
      },
    });

    // Update local state and DB
    await supabase
      .from("messages")
      .update({ replied: true })
      .eq("id", selectedMessage.id);

    setSending(false);
    setSelectedMessage(null);
    setReplyText("");
    alert("Reply sent successfully!");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this message?")) {
      await supabase.from("messages").delete().eq("id", id);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[600px]">
      {/* Sidebar List */}
      <div className="lg:col-span-1 glass rounded-3xl overflow-hidden flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold flex items-center">
            <MessageCircle className="mr-2 w-5 h-5 text-primary-light" /> Inbox
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center">
              <Loader2 className="animate-spin mx-auto text-slate-400" />
            </div>
          ) : messages.length === 0 ? (
            <div className="p-8 text-center text-slate-500 italic">
              No messages yet.
            </div>
          ) : (
            messages.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMessage(m)}
                className={`w-full text-left p-6 border-b border-white/5 transition-all hover:bg-white/5 relative ${
                  selectedMessage?.id === m.id ? "bg-primary-light/10" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold truncate pr-8">{m.name}</span>
                  {m.replied && <Check className="w-4 h-4 text-green-500" />}
                </div>
                <p className="text-sm font-medium text-slate-400 truncate mb-1">
                  {m.subject}
                </p>
                <span className="text-xs text-slate-500">
                  {new Date(m.created_at).toLocaleDateString()}
                </span>
                {!m.replied && (
                  <div className="absolute top-6 right-6 w-2 h-2 bg-primary-light rounded-full shadow-lg shadow-primary-light/50" />
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Message Content */}
      <div className="lg:col-span-2 glass rounded-3xl p-8 flex flex-col">
        {selectedMessage ? (
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-start mb-8 pb-8 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  {selectedMessage.subject}
                </h2>
                <p className="text-slate-500">
                  From:{" "}
                  <span className="font-bold text-slate-900 dark:text-white px-2 py-0.5 glass rounded-lg ml-1">
                    {selectedMessage.name} &lt;{selectedMessage.email}&gt;
                  </span>
                </p>
              </div>
              <button
                onClick={() => handleDelete(selectedMessage.id)}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto mb-8 pr-4">
              <div className="bg-slate-100 dark:bg-dark-lighter/50 p-6 rounded-2xl border border-white/5">
                <p className="whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>
            </div>

            <div className="mt-auto">
              {selectedMessage.replied ? (
                <div className="flex items-center text-green-500 font-bold glass py-4 px-6 rounded-2xl border-green-500/20">
                  <Check className="mr-2" /> This message has been replied to.
                </div>
              ) : (
                <form onSubmit={handleReply} className="space-y-4">
                  <textarea
                    required
                    rows="4"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full glass p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary-light resize-none"
                    placeholder={`Reply to ${selectedMessage.name}...`}
                  ></textarea>
                  <button
                    disabled={sending}
                    className="bg-primary-light hover:bg-primary-dark text-dark font-bold px-8 py-3 rounded-xl transition-all flex items-center float-right disabled:opacity-50"
                  >
                    {sending ? (
                      <Loader2 className="animate-spin mr-2" />
                    ) : (
                      <>
                        <Send className="mr-2 w-4 h-4" /> Send Reply
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
            <div className="w-20 h-20 bg-slate-200 dark:bg-dark-lighter rounded-full flex items-center justify-center mb-4">
              <Mail className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold">Inbox</h3>
            <p>Select a message from the sidebar to view it.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageInbox;
