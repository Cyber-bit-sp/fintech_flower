import { FileClock } from "lucide-react";
import PanelHeader from "./PanelHeader.jsx";

function AuditTrailPanel({ auditLog }) {
  return (
    <article className="panel">
      <PanelHeader eyebrow="Audit" title="Recent events" icon={FileClock} />
      <div className="feature-list">
        {auditLog.map((event) => (
          <div className="audit-row" key={event.id}>
            <span className={`event-dot ${event.severity}`} />
            <div>
              <strong>{event.action}</strong>
              <span>{event.actor} - {event.time}</span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export default AuditTrailPanel;
