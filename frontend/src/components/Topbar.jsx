import { Bell, CalendarDays, LogOut, RefreshCcw, Search, ShieldCheck } from "lucide-react";

function Topbar({ plan, company, query, user, onLogout, onQueryChange }) {
  return (
    <header className="topbar">
      <div className="topbar-copy">
        <p>{plan}</p>
        <h1>{company}</h1>
        <div className="hero-badges">
          <span>
            <ShieldCheck size={15} />
            Bank-grade controls
          </span>
          <span>
            <CalendarDays size={15} />
            Today, July 8
          </span>
        </div>
      </div>
      <div className="topbar-actions">
        <label className="search">
          <Search size={18} />
          <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search activity" />
        </label>
        <button className="icon-button" title="Refresh">
          <RefreshCcw size={18} />
        </button>
        <button className="icon-button" title="Notifications">
          <Bell size={18} />
        </button>
        <button className="profile-button" onClick={onLogout} title="Sign out">
          <span>{user?.name?.slice(0, 1) ?? "A"}</span>
          <LogOut size={17} />
        </button>
      </div>
    </header>
  );
}

export default Topbar;
