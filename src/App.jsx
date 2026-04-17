import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900">
      <Navbar />

      <main className="flex flex-1 flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explorar" element={<ExplorePage />} />
          <Route path="/explorar/:id" element={<CharacterDetailPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}