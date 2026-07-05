function Card({
    children,
    className = "",
}) {
    return (
        <div
            className={`
                rounded-2xl
                border
                border-[var(--border)]
                bg-white
                p-6
                shadow-sm
                ${className}
            `}
        >
            {children}
        </div>
    );
}

export default Card;