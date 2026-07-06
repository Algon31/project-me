import CheckboxQuest from "./CheckboxQuest";
import NumberQuest from "./NumberQuest";
import TextQuest from "./TextQuest";

function QuestRenderer({

    quest,

    onChange,

    onSave,

}) {

    switch (quest.inputType) {

        case "checkbox":

            return (

                <CheckboxQuest

                    quest={quest}

                    onChange={onChange}

                    onSave={onSave}

                />

            );

        case "number":

            return (

                <NumberQuest

                    quest={quest}

                    onChange={onChange}

                    onSave={onSave}

                />

            );

        case "text":

            return (

                <TextQuest

                    quest={quest}

                    onChange={onChange}

                    onSave={onSave}

                />

            );

        default:

            return null;

    }

}

export default QuestRenderer;