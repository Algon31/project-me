function Button({
    children,
    type = "button",
    onClick,
    className = "",
    disabled = false,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                w-full
                rounded-xl
                bg-[var(--pcolor)]
                px-5
                py-3
                text-[var(--scolor)]
                font-semibold
                transition-colors
                duration-200
                hover:bg-[var(--pcolor)]
                disabled:opacity-60
                ${className}
            `}
        >
            {children}
        </button>
    );
}

export default Button;