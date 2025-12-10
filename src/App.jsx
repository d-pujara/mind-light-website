import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MapView from './components/MapView';
import NonprofitDetail from './components/NonprofitDetail';
import Navbar from './components/Navbar';
import Admin from './components/Admin';
import ReelWidget from './components/ReelWidget';
import ReelModal from './components/ReelModal';
import IntroAnimation from './components/IntroAnimation';
import Footer from './components/Footer';
import { clients as initialClients } from './data/clients';
import { fetchClientsFromSheet } from './utils/googleSheets';
import Services from './components/WhyVideo';
import About from './components/About';
import ClientReviews from './components/ClientReviews';
import NarrativeWork from './components/NarrativeWork';
import Contact from './components/Contact';
import Work from './components/Work';
import './styles/main.css';

// Minimal App.jsx to restore functionality
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTWt5TKXuiZq1YyOmnrGV7gtDkdl3J_kjgBFKWg7cfpshO3rvftYEwYYp8BMh2Nk5R7ge4OaDe-idus/pub?output=csv";
import { clients as localClients } from './data/clients';

function AppContent() {
  const [introComplete, setIntroComplete] = useState(false);
  const [clients, setClients] = useState([]);
  const [isReelOpen, setIsReelOpen] = useState(false);
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';
  const isMapPage = location.pathname === '/';
  const [loading, setLoading] = useState(true);

  // Google Sheet ID (Published to Web)
  // Using the confirmed working URL
  const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTWt5TKXuiZq1YyOmnrGV7gtDkdl3J_kjgBFKWg7cfpshO3rvftYEwYYp8BMh2Nk5R7ge4OaDe-idus/pub?output=csv";

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  useEffect(() => {
    const loadClients = async () => {
      console.log("Fetching Google Sheet data...");
      try {
        // 1. Fetch from Google Sheet
        const fetchedClients = await fetchClientsFromSheet(SHEET_CSV_URL);

        // 2. Merge with Local Overrides/Additions
        // This allows us to "Add" clients locally via the Agent before pushing to the sheet
        const allClients = [...fetchedClients, ...localClients.filter(lc => !fetchedClients.find(fc => fc.id === lc.id))];

        setClients(allClients);
        setLoading(false);
      } catch (e) {
        console.error("Failed to load sheet data", e);
      }
    };
    loadClients();
  }, []);

  return (
    <>
      <IntroAnimation onComplete={handleIntroComplete} />

      {!isAdminPage && <Navbar />}

      <ReelModal isOpen={isReelOpen} onClose={() => setIsReelOpen(false)} />

      <Routes>
        <Route path="/" element={
          <>
            <ReelWidget onOpen={() => setIsReelOpen(true)} />
            <MapView nonprofits={clients} />
          </>
        } />
        <Route path="/work" element={<Work />} />
        <Route path="/selected-works" element={<Work />} />
        <Route path="/nonprofit/:id" element={<NonprofitDetail nonprofits={clients} />} />
        <Route path="/why-video" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/narrative-work" element={<NarrativeWork />} />
        <Route path="/admin" element={<Admin clients={clients} setClients={setClients} />} />
      </Routes>

      {!isMapPage && <Footer clients={clients} />}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <AppContent />
    </div>
  );
}

export default App;
