import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FormsPage from "./pages/forms";
import CountriesPage from "./pages/countries";

export default function App() {
  return (
    <Router>
      <div style={{ padding: 20 }}>
        <h1>My App</h1>

        {/* Menu */}
        <nav>
          <Link to="/forms">Forms</Link> |{" "}
          <Link to="/countries">Countries</Link>
        </nav>

        <hr />

        <Routes>
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/countries" element={<CountriesPage />} />
        </Routes>
      </div>
    </Router>
  );
}
