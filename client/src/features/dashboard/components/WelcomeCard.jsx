import { useAuth } from "../../../context/AuthContext";

function WelcomeCard() {
    const { user } = useAuth();

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="mb-10">

            <h1 className="text-3xl lg:text-4xl font-bold">

                {greeting},{" "}
                <span className="text-[var(--pcolor)]">
                    {user?.name}
                </span>
                👋

            </h1>

            <p className="mt-2 text-[var(--muted)]">
                {today}
            </p>

            <p className="mt-4 text-lg">
                Let's make today count.
            </p>

        </div>
    );
}

export default WelcomeCard;