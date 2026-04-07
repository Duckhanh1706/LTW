import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";

import FormsPage from "./pages/forms";
import CountriesPage from "./pages/countries";
import Home from "./pages/Home";
import About from "./pages/About";
import NoMatch from "./pages/Nomatch";
import Posts from "./pages/Posts";
import PostLists from "./pages/PostList";
import Post from "./pages/Post";

import Login from "./pages/Login";
import Stats from "./pages/Stats";
import ProtectedRoute from "./components/ProtectRoute";

function AppLayout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  function logOut() {
    setUser(null);
    navigate("/");
  }

  return (
    <>
      <nav style={{ margin: 10 }}>
        <Link to="/forms" style={{ padding: 5 }}>
          Forms
        </Link>
        <Link to="/countries" style={{ padding: 5 }}>
          Countries
        </Link>
        <Link to="/" style={{ padding: 5 }}>
          Home
        </Link>
        {user && (
          <Link to="/posts" style={{ padding: 5 }}>
            Posts
          </Link>
        )}
        <Link to="/about" style={{ padding: 5 }}>
          About
        </Link>
        <span> | </span>

        {user && (
          <Link to="/stats" style={{ padding: 5 }}>
            Stats
          </Link>
        )}
        {!user && (
          <Link to="/login" style={{ padding: 5 }}>
            Login
          </Link>
        )}

        {user && (
          <span onClick={logOut} style={{ padding: 5, cursor: "pointer" }}>
            Logout
          </span>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forms" element={<FormsPage />} />
        <Route path="/countries" element={<CountriesPage />} />

        <Route
          path="/posts"
          element={
            <ProtectedRoute user={user}>
              <Posts />
            </ProtectedRoute>
          }
        >
          <Route index element={<PostLists />} />
          <Route path=":slug" element={<Post />} />
        </Route>

        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login onLogin={setUser} />} />

        <Route
          path="/stats"
          element={
            <ProtectedRoute user={user}>
              <Stats user={user} />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div style={{ padding: 20 }}>
        <h1>My Blog App</h1>
        <AppLayout />
      </div>
    </Router>
  );
}
