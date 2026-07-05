function Badge({
    children,
}) {
    return (
        <span
            className="
                rounded-full
                bg-[var(--scolor)]
                px-3
                py-1
                text-xs
                font-semibold
                text-[var(--pcolor)]
            "
        >
            {children}
        </span>
    );
}

export default Badge;