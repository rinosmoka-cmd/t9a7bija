import { useState } from "react";
import { Toaster } from "sonner";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import PostModal from "./components/PostModal";
import { Id } from "../convex/_generated/dataModel";

export default function App() {
  const [page, setPage] = useState<"home" | "admin">("home");
  const [selectedPostId, setSelectedPostId] = useState<Id<"posts"> | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {page === "home" && (
        <HomePage
          onAdminClick={() => setPage("admin")}
          onPostClick={(id) => setSelectedPostId(id)}
        />
      )}
      {page === "admin" && (
        <AdminPage onBack={() => setPage("home")} />
      )}
      {selectedPostId && (
        <PostModal
          postId={selectedPostId}
          onClose={() => setSelectedPostId(null)}
        />
      )}
      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
}
