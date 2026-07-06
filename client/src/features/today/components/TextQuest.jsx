import { useState } from "react";

import Textarea from "../../../shared/components/Textarea";
import Button from "../../../shared/components/Button";
import QuestCard from "./QuestCard";

function TextQuest({
    quest,
    onChange,
    onSave,
}) {

    const [editing, setEditing] = useState(!quest.completed);

    const handleSave = () => {
        onSave?.();
        setEditing(false);
    };

    return (
        <QuestCard quest={quest}>

            {editing ? (

                <div className="space-y-5">

                    <Textarea
                        rows={4}
                        value={quest.value}
                        placeholder="Write your answer..."
                        onChange={(e) =>
                            onChange(e.target.value)
                        }
                    />

                    <Button
                        onClick={handleSave}
                    >
                        Save Quest
                    </Button>

                </div>

            ) : (

                <div className="space-y-5">

                    <div>

                        <p className="whitespace-pre-wrap text-[var(--text)]">
                            {quest.value || "No response."}
                        </p>

                        <p className="mt-3 font-medium text-green-600">
                            ✓ Completed
                        </p>

                    </div>

                    <Button
                        className="w-auto px-5"
                        onClick={() => setEditing(true)}
                    >
                        Edit
                    </Button>

                </div>

            )}

        </QuestCard>
    );

}

export default TextQuest;