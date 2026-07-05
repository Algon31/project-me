function Card({
    children,
    className = "",
}) {
    return (
        <div
            className={`
                bg-white
                rounded-2xl
                border
                border-[var(--border)]
                p-6
                transition-all
                duration-200
                hover:border-[var(--pcolor)]
                ${className}
            `}
        >
            {children}
        </div>
    );
}

export default Card;