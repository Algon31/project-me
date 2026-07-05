function Section({
    children,
    className = "",
}) {
    return (
        <section
            className={`space-y-6 ${className}`}
        >
            {children}
        </section>
    );
}

export default Section;