function ActivityFeed({

    notifications,

}) {

    return (

        <div className="rounded-3xl border border-[var(--border)] bg-white p-8">

            <h2 className="mb-8 text-3xl font-bold">

                Activity Log

            </h2>

            {

                notifications.length === 0 && (

                    <p className="text-[var(--muted)]">

                        No activity yet.

                    </p>

                )

            }

            <div className="space-y-5">

                {

                    notifications.map((item) => (

                        <div

                            key={item._id}

                            className="rounded-2xl bg-[var(--bg)] p-5"

                        >

                            <div className="flex items-center justify-between">

                                <h3 className="font-semibold">

                                    {item.title}

                                </h3>

                                <span className="text-xs text-[var(--muted)]">

                                    {new Date(item.createdAt).toLocaleDateString()}

                                </span>

                            </div>

                            <p className="mt-2 text-[var(--muted)]">

                                {item.message}

                            </p>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default ActivityFeed;