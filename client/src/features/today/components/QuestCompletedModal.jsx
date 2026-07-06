import Button from "../../../shared/components/Button";

function QuestCompletedModal({

    open,

    result,

    onClose,

}) {

    if (!open || !result) return null;

    return (

        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/50
            "
        >

            <div
                className="
                    w-full
                    max-w-lg
                    rounded-3xl
                    bg-white
                    p-8
                "
            >

                <h1 className="text-4xl font-black">

                    QUEST COMPLETED

                </h1>

                <h2 className="mt-6 text-2xl font-bold">

                    {result.questName}

                </h2>

                <div className="mt-8 space-y-4">

                    <div className="flex justify-between">

                        <span>XP Earned</span>

                        <strong>

                            +{result.xpEarned}

                        </strong>

                    </div>

                    <div className="flex justify-between">

                        <span>Level</span>

                        <strong>

                            {result.level}

                        </strong>

                    </div>

                    <div className="flex justify-between">

                        <span>Rank</span>

                        <strong>

                            {result.rank}

                        </strong>

                    </div>

                </div>

                <Button

                    className="mt-10"

                    onClick={onClose}

                >

                    Continue

                </Button>

            </div>

        </div>

    );

}

export default QuestCompletedModal;