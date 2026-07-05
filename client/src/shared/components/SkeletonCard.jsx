function SkeletonCard() {
    return (
        <div
            className="
                h-28
                animate-pulse
                rounded-2xl
                border
                border-[var(--border)]
                bg-white
                p-6
            "
        >
            <div className="h-5 w-1/3 rounded bg-[var(--border)]" />

            <div className="mt-5 h-4 w-2/3 rounded bg-[var(--border)]" />
        </div>
    );
}

export default SkeletonCard;