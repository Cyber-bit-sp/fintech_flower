import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { money } from "../utils/formatters.js";
import PanelHeader from "./PanelHeader.jsx";

function CashflowPanel({ cashflow }) {
  return (
    <article className="panel wide">
      <PanelHeader eyebrow="Cashflow" title="Income and expenses" action={<span className="pill">Live forecast</span>} />
      <div className="chart-box">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={cashflow}>
            <defs>
              <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#157f72" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#157f72" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#dce7e2" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
            <Tooltip formatter={(value) => money.format(value)} />
            <Area type="monotone" dataKey="income" stroke="#157f72" fill="url(#income)" strokeWidth={3} />
            <Area type="monotone" dataKey="expenses" stroke="#b65f2b" fill="transparent" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}

export default CashflowPanel;
