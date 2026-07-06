import QuestItem from "./QuestItem";

function QuestList({
    quests,
    onEdit,
    onDelete,
}) {

    return (

        <div className="space-y-5">

            {quests.map((quest) => (

                <QuestItem
                    key={quest._id}
                    quest={quest}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />

            ))}

        </div>

    );

}

export default QuestList;