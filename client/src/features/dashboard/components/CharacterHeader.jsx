import { Shield, Star } from "lucide-react";

function CharacterHeader({

    character,

    user,

}) {

    return (

        <div
            className="
                rounded-3xl
                bg-[var(--pcolor)]
                p-6
                text-white
                shadow-lg
                sm:p-8
            "
        >

            <div
                className="
                    flex
                    flex-col
                    gap-6
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >

                <div>

                    <p className="text-sm opacity-80">

                        Ready For Today?

                    </p>

                    <h1 className="mt-2 text-3xl font-black sm:text-5xl">

                        {user?.name}

                    </h1>

                    <p className="mt-4 opacity-90">

                        Selected Class : {user?.selectedClass}

                    </p>

                </div>

                <div
                    className="
                        rounded-2xl
                        bg-white/10
                        p-5
                        backdrop-blur
                    "
                >

                    <div className="flex items-center gap-3">

                        <Star size={22}/>

                        <span className="text-xl font-bold">

                            Rank {character.rank}

                        </span>

                    </div>

                    <div className="mt-3 flex items-center gap-3">

                        <Shield size={22}/>

                        <span>

                            Level {character.level}

                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CharacterHeader;