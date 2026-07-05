function ConfirmDialog({
    open,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="w-full max-w-md rounded-2xl bg-white p-6">

                <h2 className="text-2xl font-bold">
                    {title}
                </h2>

                <p className="mt-3 text-[var(--muted)]">
                    {message}
                </p>

                <div className="mt-8 flex justify-end gap-3">

                    <button
                        onClick={onCancel}
                        className="
                            rounded-xl
                            border
                            border-[var(--border)]
                            px-5
                            py-3
                            transition-colors
                            hover:bg-[var(--bg)]
                        "
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        className="
                            rounded-xl
                            bg-red-600
                            px-5
                            py-3
                            font-semibold
                            text-white
                            transition-colors
                            hover:bg-red-700
                        "
                    >
                        {confirmText}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ConfirmDialog;