function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl border border-slate-800 bg-slate-900/90 p-6 text-white shadow-xl backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;