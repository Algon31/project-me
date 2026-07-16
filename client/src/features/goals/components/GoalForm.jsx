import { useState } from "react";

import Button from "../../../shared/components/Button";

function GoalForm({

    onSubmit,

}){

    const [goal,setGoal]=useState({

        title:"",

        description:"",

        category:"Career",

        target:100,

        xpReward:1000,

    });

    function submit(e){

        e.preventDefault();

        onSubmit(goal);

    }

    return(

        <form
            onSubmit={submit}
            className="space-y-5"
        >

            <input
                className="w-full rounded-xl border p-3"
                placeholder="Goal Title"
                value={goal.title}
                onChange={(e)=>
                    setGoal({

                        ...goal,

                        title:e.target.value,

                    })
                }
            />

            <textarea
                className="w-full rounded-xl border p-3"
                rows={4}
                placeholder="Description"
                value={goal.description}
                onChange={(e)=>
                    setGoal({

                        ...goal,

                        description:e.target.value,

                    })
                }
            />

            <Button type="submit">

                Create Goal

            </Button>

        </form>

    );

}

export default GoalForm;