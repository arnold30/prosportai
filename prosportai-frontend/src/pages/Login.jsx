import { useState } from "react";
import { supabase } from "../../prosportai-supabase-frontend/src/lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Sesión iniciada");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Iniciar Sesión</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}