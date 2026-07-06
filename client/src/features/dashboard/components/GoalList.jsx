import Card from "../../../shared/components/Card";

function GoalList({ goals }) {

    return (

        <Card>

            <h2 className="mb-8 text-3xl font-bold">

                Main Quests

            </h2>

            {
                goals.length === 0 && (

                    <p className="text-[var(--muted)]">

                        No active goals.

                    </p>

                )
            }

            <div className="space-y-6">

                {

                    goals.map((goal) => {

                        const progress = Math.min(
                            (goal.progress / goal.target) * 100,
                            100
                        );

                        return (

                            <div
                                key={goal._id}
                                className="rounded-2xl bg-[var(--bg)] p-5"
                            >

                                <div className="flex justify-between">

                                    <div>

                                        <h3 className="text-lg font-bold">

                                            {goal.title}

                                        </h3>

                                        <p className="text-sm text-[var(--muted)]">

                                            {goal.category}

                                        </p>

                                    </div>

                                    <div className="text-right">

                                        <p className="font-bold">

                                            +{goal.xpReward} XP

                                        </p>

                                    </div>

                                </div>

                                <div className="mt-5 h-3 rounded-full bg-[var(--border)] overflow-hidden">

                                    <div
                                        className="h-full bg-[var(--pcolor)]"
                                        style={{
                                            width: `${progress}%`,
                                        }}
                                    />

                                </div>

                                <div className="mt-3 flex justify-between text-sm">

                                    <span>

                                        {goal.progress} / {goal.target}

                                    </span>

                                    <span>

                                        {Math.round(progress)}%

                                    </span>

                                </div>

                            </div>

                        );

                    })

                }

            </div>

        </Card>

    );

}

export default GoalList;