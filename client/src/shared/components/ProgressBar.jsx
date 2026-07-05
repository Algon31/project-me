function ProgressBar({ value }) {

    return (

        <div className="rounded-2xl border border-[var(--border)] bg-white p-6">

            <div className="mb-4 flex items-center justify-between">

                <span className="font-semibold">
                    Today's Progress
                </span>

                <span className="font-bold text-[var(--pcolor)]">
                    {value}%
                </span>

            </div>

            <div className="h-4 overflow-hidden rounded-full bg-[var(--border)]">

                <div
                    className="h-full rounded-full bg-[var(--pcolor)] transition-all duration-500"
                    style={{
                        width: `${value}%`,
                    }}
                />

            </div>

        </div>

    );

}

export default ProgressBar;