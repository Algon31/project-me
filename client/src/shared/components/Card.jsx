function Card({ children }) {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-sm">
            {children}
        </div>
    );
}

export default Card;