function NotificationList({

    notifications,

}) {

    if (notifications.length === 0) {

        return (

            <div className="rounded-3xl border bg-white p-8">

                No notifications yet.

            </div>

        );

    }

    return (

        <div className="space-y-5">

            {

                notifications.map((notification) => (

                    <div
                        key={notification._id}
                        className="
                            rounded-3xl
                            border
                            border-[var(--border)]
                            bg-white
                            p-6
                        "
                    >

                        <div className="flex justify-between">

                            <h2 className="font-bold text-lg">

                                {notification.title}

                            </h2>

                            <span className="text-sm text-[var(--muted)]">

                                {new Date(
                                    notification.createdAt
                                ).toLocaleDateString()}

                            </span>

                        </div>

                        <p className="mt-3 text-[var(--muted)]">

                            {notification.message}

                        </p>

                    </div>

                ))

            }

        </div>

    );

}

export default NotificationList;