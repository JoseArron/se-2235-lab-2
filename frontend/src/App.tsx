import { StrictMode } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import LandingPage from "@/pages/LandingPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import NotePage from "@/pages/NotePage";
import FlashcardsPage from "@/pages/FlashcardsPage";
import FlashcardsQuizPage from "@/pages/FlashcardsQuizPage";
import UserDecksPage from "@/pages/UserDecksPage";
import LoadingScreen from "@/components/LoadingScreen";
import SideBarLayout from "@/components/Sidebar/Layout";
import NotesHistoryPage from "@/pages/NotesHistoryPage";
import GeneratedVideosPage from "@/pages/GeneratedVideosPage";

import useUserVerification from "@/hooks/auth/useUserVerification";
import useUser from "@/hooks/auth/useUser";
import useFetchUserDecks from "@/hooks/Decks/useFetchUserDecks";
import useFetchNotes from "@/hooks/Notes/useFetchNotes";
import ThemeProvider from "./context/ThemeProvider";

const App = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    loading: loadingVerification,
  } = useUserVerification();
  const { user, loading: loadingUser } = useUser();
  const { loading: loadingDecks } = useFetchUserDecks(user?.id || "");
  const { loading: loadingNotes } = useFetchNotes(user?.id || "");

  return loadingVerification || loadingUser || loadingDecks || loadingNotes ? (
    <LoadingScreen />
  ) : (
    <StrictMode>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* routes with sidebar */}
            <Route element={<SideBarLayout />}>
              <Route
                path="/upload-notes"
                element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
              />
              <Route
                path="/notes/:noteId"
                element={isAuthenticated ? <NotePage /> : <Navigate to="/" />}
              />
              <Route
                path="/decks"
                element={
                  isAuthenticated ? <UserDecksPage /> : <Navigate to="/" />
                }
              />
              <Route
                path="/flashcards/:deckId"
                element={
                  isAuthenticated ? <FlashcardsPage /> : <Navigate to="/" />
                }
              />
              <Route
                path="/quiz/:deckId"
                element={
                  isAuthenticated ? <FlashcardsQuizPage /> : <Navigate to="/" />
                }
              />
              <Route
                path="/notes-history"
                element={
                  isAuthenticated ? <NotesHistoryPage /> : <Navigate to="/" />
                }
              />
              <Route
                path="/generated-videos"
                element={
                  isAuthenticated ? (
                    <GeneratedVideosPage />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            </Route>

            {/* routes with no sidebar */}
            <Route
              path="/"
              element={
                !isAuthenticated ? (
                  <LandingPage />
                ) : (
                  <Navigate to="/upload-notes" />
                )
              }
            />
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <LoginPage setAuth={setIsAuthenticated} />
                ) : (
                  <Navigate to="/upload-notes" />
                )
              }
            />
            <Route
              path="/register"
              element={
                !isAuthenticated ? (
                  <RegisterPage setAuth={setIsAuthenticated} />
                ) : (
                  <Navigate to="/upload-notes" />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StrictMode>
  );
};

export default App;
