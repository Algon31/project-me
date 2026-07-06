import { useState } from "react";

import Button from "../../../shared/components/Button";
import QuestCard from "./QuestCard";

function NumberQuest({
    quest,
    onChange,
    onSave,
}) {

    const [editing, setEditing] = useState(!quest.completed);

    const increase = () => {
        onChange(quest.value + 1);
    };

    const decrease = () => {
        onChange(Math.max(0, quest.value - 1));
    };

    const handleSave = () => {
        onSave?.();
        setEditing(false);
    };

    return (
        <QuestCard quest={quest}>

            {editing ? (

                <div className="flex flex-col gap-5">

                    <div className="flex items-center justify-center gap-6">

                        <button
                            onClick={decrease}
                            className="
                                h-10
                                w-full sm:w-auto
                                rounded-xl
                                border
                                border-[var(--border)]
                                text-xl
                                font-bold
                                transition
                                hover:bg-[var(--bg)]
                            "
                        >
                            −
                        </button>

                        <span className="min-w-12 text-center text-3xl font-bold">
                            {quest.value}
                        </span>

                        <button
                            onClick={increase}
                            className="
                                h-10
                                w-full sm:w-auto
                                rounded-xl
                                border
                                border-[var(--border)]
                                text-xl
                                font-bold
                                transition
                                hover:bg-[var(--bg)]
                            "
                        >
                            +
                        </button>

                    </div>

                    <Button className="w-full sm:w-auto" onClick={handleSave}>
                        Save Quest
                    </Button>

                </div>

            ) : (

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-lg font-semibold">
                            {quest.value} {quest.name}
                        </p>

                        <p className="mt-1 text-green-600 font-medium">
                            ✓ Completed
                        </p>

                    </div>

                    <Button
                        className="w-full sm:w-auto"
                        onClick={() => setEditing(true)}
                    >
                        Edit
                    </Button>

                </div>

            )}

        </QuestCard>
    );

}

export default NumberQuest;