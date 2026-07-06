import Card from "../../../shared/components/Card";

function GoalCard({ goal }) {

    const progress = Math.min(
        (goal.progress / goal.target) * 100,
        100
    );

    return (

        <Card>

            <div className="flex justify-between">

                <div>

                    <h2 className="text-2xl font-bold">

                        {goal.title}

                    </h2>

                    <p className="text-[var(--muted)] mt-2">

                        {goal.description}

                    </p>

                </div>

                <div className="text-right">

                    <p className="font-bold text-[var(--pcolor)]">

                        +{goal.xpReward} XP

                    </p>

                </div>

            </div>

            <div className="mt-6">

                <div className="h-3 rounded-full bg-[var(--border)] overflow-hidden">

                    <div

                        className="h-full bg-[var(--pcolor)]"

                        style={{

                            width:`${progress}%`

                        }}

                    />

                </div>

            </div>

            <div className="mt-3 flex justify-between">

                <span>

                    {goal.progress}/{goal.target}

                </span>

                <span>

                    {Math.round(progress)}%

                </span>

            </div>

        </Card>

    );

}

export default GoalCard;