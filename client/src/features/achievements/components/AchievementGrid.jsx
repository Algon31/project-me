function AchievementGrid({

    achievements,

}) {

    return (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {

                achievements.map((achievement)=>(

                    <div

                        key={achievement._id}

                        className={`
                            rounded-3xl
                            border
                            p-6
                            transition-all

                            ${
                                achievement.unlocked

                                ?

                                "bg-white border-[var(--pcolor)]"

                                :

                                "bg-gray-100 opacity-60"

                            }

                        `}

                    >

                        <div className="text-5xl">

                            {achievement.icon}

                        </div>

                        <h2 className="mt-5 text-2xl font-bold">

                            {achievement.title}

                        </h2>

                        <p className="mt-2 text-[var(--muted)]">

                            {achievement.description}

                        </p>

                    </div>

                ))

            }

        </div>

    );

}

export default AchievementGrid;