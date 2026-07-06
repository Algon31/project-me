import Card from "../../../shared/components/Card";

function QuestCard({
    quest,
    children,
}) {

    return (

        <Card
            className="
                mb-5
                rounded-3xl
                border-2
                border-[var(--border)]
                p-5
                transition-all
                duration-200
                hover:border-[var(--pcolor)]
                sm:p-6
                lg:p-8
            "
        >

            <div
                className="
                    flex
                    flex-col
                    gap-5
                    sm:flex-row
                    sm:items-start
                    sm:justify-between
                "
            >

                <div className="flex-1">

                    <h2
                        className="
                            text-xl
                            font-bold
                            sm:text-2xl
                        "
                    >

                        {quest.name}

                    </h2>

                    {

                        quest.description && (

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    leading-6
                                    text-[var(--muted)]
                                "
                            >

                                {quest.description}

                            </p>

                        )

                    }

                </div>

                <div
                    className="
                        flex
                        flex-row
                        items-center
                        justify-between
                        rounded-2xl
                        bg-[var(--bg)]
                        px-4
                        py-3
                        sm:flex-col
                        sm:justify-center
                        sm:min-w-[110px]
                    "
                >

                    <span
                        className="
                            text-2xl
                            font-black
                            text-[var(--pcolor)]
                        "
                    >

                        +{quest.xpReward}

                    </span>

                    <span
                        className="
                            text-xs
                            uppercase
                            tracking-wider
                            text-[var(--muted)]
                        "
                    >

                        XP

                    </span>

                </div>

            </div>

            <div className="mt-6">

                {children}

            </div>

        </Card>

    );

}

export default QuestCard;