function Textarea({
    label,
    className = "",
    ...props
}) {
    return (
        <div className="space-y-2">

            {label && (
                <label className="text-sm font-medium">
                    {label}
                </label>
            )}

            <textarea
                {...props}
                className={`
                    w-full
                    rounded-xl
                    border
                    border-[var(--border)]
                    bg-white
                    px-4
                    py-3
                    outline-none
                    resize-none
                    focus:border-[var(--pcolor)]
                    ${className}
                `}
            />

        </div>
    );
}

export default Textarea;