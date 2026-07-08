import { Bell, RefreshCcw, Search } from "lucide-react";

function Topbar({ plan, company, query, onQueryChange }) {
  return (
    <header className="topbar">
      <div>
        <p>{plan}</p>
        <h1>{company}</h1>
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
      </div>
    </header>
  );
}

export default Topbar;
