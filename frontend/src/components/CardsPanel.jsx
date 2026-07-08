import { LockKeyhole } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { money } from "../utils/formatters.js";
import PanelHeader from "./PanelHeader.jsx";

function CardsPanel({ cards }) {
  const primaryCard = cards[0];

  return (
    <article className="panel">
      <PanelHeader eyebrow="Cards" title="Spend control" icon={LockKeyhole} />
      {primaryCard && (
        <div className="virtual-card">
          <div>
            <span>Aurora corporate</span>
            <strong>{primaryCard.policy}</strong>
          </div>
          <p>**** **** **** {primaryCard.last4}</p>
          <div>
            <span>{primaryCard.holder}</span>
            <b>{Math.round((primaryCard.spent / primaryCard.limit) * 100)}% used</b>
          </div>
        </div>
      )}
      <div className="card-stack">
        {cards.map((card) => (
          <div className="team-card" key={card.id}>
            <div>
              <strong>{card.holder}</strong>
              <span>{card.policy} - **** {card.last4}</span>
            </div>
            <b>{Math.round((card.spent / card.limit) * 100)}%</b>
          </div>
        ))}
      </div>
      <div className="mini-bars">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cards}>
            <XAxis dataKey="holder" hide />
            <YAxis hide />
            <Tooltip formatter={(value) => money.format(value)} />
            <Bar dataKey="spent" fill="#2f5c99" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}

export default CardsPanel;
