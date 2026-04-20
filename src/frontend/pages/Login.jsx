import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config/api";

export default function Login({ onLogin }) {
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    setError("");

    fetch(`${API_BASE}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(creds),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Sai tài khoản hoặc mật khẩu");
        return res.json();
      })
      .then((data) => {
        // ✅ Lưu JWT token thật
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        onLogin?.(data.user);
        navigate("/stats");
      })
      .catch((err) => setError(err.message));
  }

  return (
    <div style={{ padding: 10 }}>
      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={(e) =>
          setCreds((prev) => ({ ...prev, username: e.target.value }))
        }
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setCreds((prev) => ({ ...prev, password: e.target.value }))
        }
      />
      <br />

      <button onClick={handleLogin} style={{ marginTop: 10 }}>
        Login
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
