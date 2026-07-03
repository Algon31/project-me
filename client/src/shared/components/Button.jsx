function Button({
    children,
    onClick,
    type = "button",
    className = "",
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`w-full rounded-xl bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700 transition ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;