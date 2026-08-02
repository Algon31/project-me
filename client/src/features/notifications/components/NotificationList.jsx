function NotificationList({ notifications }) {
  if (!notifications || notifications.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 text-center text-slate-400 backdrop-blur-xl">
        No notifications yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification._id}
          className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl backdrop-blur-xl text-white transition hover:border-slate-700"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-black text-lg text-white">
              {notification.title}
            </h2>

            <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
              {new Date(notification.createdAt).toLocaleDateString()}
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            {notification.message}
          </p>
        </div>
      ))}
    </div>
  );
}

export default NotificationList;