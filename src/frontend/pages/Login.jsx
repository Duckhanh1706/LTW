import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((res) => {
        if (res.ok) {
          onLogin && onLogin({ username: creds.username });
          navigate("/stats");
        } else {
          setError("Invalid username or password!");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Login failed!");
      });
  }

  return (
    <div style={{ padding: 10 }}>
      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={(e) => setCreds({ ...creds, username: e.target.value })}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setCreds({ ...creds, password: e.target.value })}
      />
      <br />

      <button onClick={handleLogin} style={{ marginTop: "10px" }}>
        Login
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
