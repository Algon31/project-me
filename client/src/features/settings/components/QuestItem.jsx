import Card from "../../../shared/components/Card";
import Button from "../../../shared/components/Button";

function QuestItem({
    quest,
    onEdit,
    onDelete,
}) {

    return (

        <Card>

            <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">

                <div className="flex-1">

                    <div className="flex items-center gap-3">

                        <h2 className="text-2xl font-semibold">
                            {quest.name}
                        </h2>

                        <span
                            className="
                                rounded-full
                                bg-[var(--pcolor)]
                                px-3
                                py-1
                                text-xs
                                text-white
                            "
                        >
                            {quest.category}
                        </span>

                    </div>

                    {quest.description && (

                        <p className="mt-3 text-[var(--muted)]">

                            {quest.description}

                        </p>

                    )}

                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">

                        <div>

                            <p className="font-semibold">
                                Quest Type
                            </p>

                            <p>{quest.questType}</p>

                        </div>

                        <div>

                            <p className="font-semibold">
                                Input
                            </p>

                            <p>{quest.inputType}</p>

                        </div>

                        <div>

                            <p className="font-semibold">
                                XP
                            </p>

                            <p>{quest.xpReward}</p>

                        </div>

                        <div>

                            <p className="font-semibold">
                                Skill
                            </p>

                            <p>

                                {quest.skill || "-"}

                            </p>

                        </div>

                    </div>

                    <div className="mt-6">

                        <p className="mb-2 font-semibold">

                            Affects

                        </p>

                        <div className="flex flex-wrap gap-2">

                            {quest.affectsAttributes.map((attribute) => (

                                <span
                                    key={attribute}
                                    className="
                                        rounded-full
                                        border
                                        border-[var(--border)]
                                        px-3
                                        py-1
                                        text-sm
                                    "
                                >
                                    {attribute}
                                </span>

                            ))}

                        </div>

                    </div>

                </div>

                <div className="flex flex-col gap-3">

                    <Button
                        className="px-6"
                        onClick={() => onEdit(quest)}
                    >
                        Edit
                    </Button>

                    <button
                        onClick={() => onDelete(quest._id)}
                        className="
                            rounded-xl
                            border
                            border-red-300
                            px-6
                            py-3
                            text-red-600
                            transition
                            hover:bg-red-50
                        "
                    >
                        Delete
                    </button>

                </div>

            </div>

        </Card>

    );

}

export default QuestItem;