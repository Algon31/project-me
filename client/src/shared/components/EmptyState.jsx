import Button from "./Button";

function EmptyState({
    title,
    description,
    buttonText,
    onClick,
}) {
    return (
        <div className="rounded-2xl border border-dashed border-[var(--border)] bg-white p-12 text-center">

            <h2 className="text-2xl font-semibold">

                {title}

            </h2>

            <p className="mt-3 text-[var(--muted)]">

                {description}

            </p>

            {buttonText && (

                <Button
                    className="mt-8 max-w-xs mx-auto"
                    onClick={onClick}
                >
                    {buttonText}
                </Button>

            )}

        </div>
    );
}

export default EmptyState;