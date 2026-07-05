import {
    CalendarCheck,
    BarChart3,
    Settings,
} from "lucide-react";

import QuickActionCard from "./QuickActionCard";

function QuickActions() {
    return (

        <div className="grid gap-5 md:grid-cols-3">

            <QuickActionCard
                title="Continue Today"
                description="Open today's tracker."
                to="/today"
                icon={<CalendarCheck />}
            />

            <QuickActionCard
                title="Analytics"
                description="View your progress."
                to="/analytics"
                icon={<BarChart3 />}
            />

            <QuickActionCard
                title="Settings"
                description="Customize your tracker."
                to="/settings"
                icon={<Settings />}
            />

        </div>

    );
}

export default QuickActions;