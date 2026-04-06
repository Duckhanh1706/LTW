import { useState, useRef } from "react";
import axios from "axios";

export default function App() {
  // ===== Controlled Form =====
  const [login, setLogin] = useState({
    name: "",
    email: "",
    password: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleLoginChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
    setSuccess(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!login.name || !login.email || !login.password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      setSuccess(false);
      return;
    }
    alert("Đăng nhập thành công!");
  };

  // ===== Uncontrolled Form =====
  const nameRef = useRef();
  const emailRef = useRef();
  const ageRef = useRef();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (
      !nameRef.current.value ||
      !emailRef.current.value ||
      !ageRef.current.value
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    alert("Đăng ký thành công!");
  };

  // ===== Mixed Form =====
  const [rating, setRating] = useState(5);
  const commentRef = useRef();

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!commentRef.current.value || !rating) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    alert("Cảm ơn bạn đã gửi phản hồi!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>React Demo</h1>

      {/* ===== Form 1 ===== */}
      <h2>1. Controlled Form</h2>
      <form onSubmit={handleLoginSubmit}>
        <input name="name" placeholder="Name" onChange={handleLoginChange} />
        <br />
        <br />

        <input name="email" placeholder="Email" onChange={handleLoginChange} />
        <br />
        <br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleLoginChange}
        />
        <br />
        <br />

        <button type="submit">Login</button>
      </form>

      {/* ===== Form 2 ===== */}
      <h2>2. Uncontrolled Form</h2>
      <form onSubmit={handleRegisterSubmit}>
        <input ref={emailRef} placeholder="Email" />
        <br />
        <br />
        <input ref={nameRef} placeholder="Name" />
        <br />
        <br />
        <input ref={ageRef} placeholder="Age" />
        <br />
        <br />
        <button type="submit">Register</button>
      </form>

      {/* ===== Form 3 ===== */}
      <h2>3. Mixed Form</h2>
      <form onSubmit={handleFeedbackSubmit}>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="5">5 sao</option>
          <option value="4">4 sao</option>
          <option value="3">3 sao</option>
        </select>

        <br />
        <br />

        <textarea ref={commentRef} placeholder="Comment..." />
        <br />
        <br />

        <button type="submit">Send</button>
      </form>
    </div>
  );
}
