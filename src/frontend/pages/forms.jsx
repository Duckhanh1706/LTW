import { useState, useRef } from "react";
import "../App.css";

export default function FormsPage() {
  const [login, setLogin] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!login.name || !login.email || !login.password) {
      alert("Vui long nhập đủ thông tin!");
      return;
    }
    alert("Đăng nhập thành công!");
  };

  // Uncontrolled
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
      alert("Vui lòng nhập đủ thông tin!");
      return;
    }
    alert("Đăng ký thành công!");
  };

  // Mixed
  const [rating, setRating] = useState(5);
  const commentRef = useRef();

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!commentRef.current.value || !rating) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    alert("Cảm ơn bạn đã phản hồi!");
  };

  return (
    <div>
      <h2>Forms Page</h2>

      {/* Controlled */}
      <form onSubmit={handleLoginSubmit}>
        <h3>1. Controlled</h3>
        <input name="name" onChange={handleLoginChange} placeholder="Name" />
        <input name="email" onChange={handleLoginChange} placeholder="Email" />
        <input
          name="password"
          type="password"
          onChange={handleLoginChange}
          placeholder="Password"
        />
        <button>Login</button>
      </form>

      <br />

      {/* Uncontrolled */}
      <form onSubmit={handleRegisterSubmit}>
        <h3>2. Uncontrolled</h3>
        <input ref={nameRef} placeholder="Name" />
        <input ref={emailRef} placeholder="Email" />
        <input ref={ageRef} placeholder="Age" />
        <button>Register</button>
      </form>

      <br />

      {/* Mixed */}
      <form onSubmit={handleFeedbackSubmit}>
        <h3>3. Mixed</h3>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="5">5 sao</option>
          <option value="4">4 sao</option>
        </select>
        <textarea ref={commentRef} placeholder="Comment..." />
        <button>Send</button>
      </form>
    </div>
  );
}
