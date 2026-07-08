function PanelHeader({ eyebrow, title, action, icon: Icon }) {
  return (
    <div className="panel-heading">
      <div>
        <p>{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {Icon ? <Icon size={22} /> : action}
    </div>
  );
}

export default PanelHeader;
