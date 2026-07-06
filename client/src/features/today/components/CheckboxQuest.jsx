import { useState } from "react";

import Checkbox from "../../../shared/components/Checkbox";
import Button from "../../../shared/components/Button";
import QuestCard from "./QuestCard";

function CheckboxQuest({

    quest,

    onChange,

    onSave,

}) {

    const [editing, setEditing] = useState(

        !quest.completed

    );

    return (

        <QuestCard quest={quest}>

            {

                editing

                ?

                <div className="flex items-center gap-5">

                    <Checkbox

                        checked={quest.value}

                        onClick={()=>

                            onChange(

                                !quest.value

                            )

                        }

                    />

                    <Button className="w-full sm:w-auto"

                        onClick={async()=>{

                            await onSave();

                            setEditing(false);

                        }}

                    >

                        Save Quest

                    </Button>

                </div>

                :

                <div className="flex items-center gap-5">

                    <span className="font-bold text-green-600">

                        ✓ Completed

                    </span>

                    <Button className="w-full sm:w-auto"

                        onClick={()=>setEditing(true)}

                    >

                        Edit

                    </Button>

                </div>

            }

        </QuestCard>

    );

}

export default CheckboxQuest;