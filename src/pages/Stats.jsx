import { useState } from "react";

export default function Stats({ user }) {
  return (
    <div>
      <h2>Stats Page</h2>
      <p>Welcome, {user?.username}</p>
    </div>
  );
}
