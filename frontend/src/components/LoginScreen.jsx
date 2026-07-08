import { Landmark, LockKeyhole } from "lucide-react";
import { useState } from "react";

function LoginScreen({ onLogin }) {
  const [credentials, setCredentials] = useState({
    email: "jordan@aurora.test",
    password: "Aurora@2026"
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitLogin(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await onLogin(credentials);
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-shell">
      <section className="login-hero">
        <div className="brand">
          <div className="brand-mark">A</div>
          <div>
            <strong>Aurora</strong>
            <span>Fintech OS</span>
          </div>
        </div>
        <div>
          <p>Private banking command center</p>
          <h1>Control cash, cards, risk, and treasury in one secure workspace.</h1>
        </div>
        <div className="login-proof">
          <span>
            <LockKeyhole size={16} />
            Signed sessions
          </span>
          <span>
            <Landmark size={16} />
            Demo banking data
          </span>
        </div>
      </section>

      <form className="login-card" onSubmit={submitLogin}>
        <div>
          <p>Welcome back</p>
          <h2>Sign in to Aurora</h2>
        </div>
        <label>
          Email
          <input
            value={credentials.email}
            onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
            type="email"
            autoComplete="email"
          />
        </label>
        <label>
          Password
          <input
            value={credentials.password}
            onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
            type="password"
            autoComplete="current-password"
          />
        </label>
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
        {error && <div className="notice error">{error}</div>}
        <small>Demo: jordan@aurora.test / Aurora@2026</small>
      </form>
    </main>
  );
}

export default LoginScreen;
