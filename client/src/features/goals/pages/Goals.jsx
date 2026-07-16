import { useEffect, useState } from "react";

import MainLayout from "../../../components/layout/MainLayout";

import PageHeader from "../../../shared/components/PageHeader";

import GoalCard from "../components/GoalCard";

import GoalForm from "../components/GoalForm";

import {

    getGoals,

    createGoal,

} from "../services/goalService";

function Goals(){

    const [goals,setGoals]=useState([]);

    useEffect(()=>{

        loadGoals();

    },[]);

    async function loadGoals(){

        const data=

        await getGoals();

        setGoals(data);

    }

    async function addGoal(goal){

        await createGoal(goal);

        loadGoals();

    }

    return(

        <MainLayout>

            <PageHeader

                title="Main Quests"

                subtitle="🚧🚧🚧🚧 This page is still in consrtuction 🚧🚧🚧🚧"

            />

            <GoalForm

                onSubmit={addGoal}

            />

            <div className="mt-10 space-y-6">

                {

                    goals.map(goal=>(

                        <GoalCard

                            key={goal._id}

                            goal={goal}

                        />

                    ))

                }

            </div>

        </MainLayout>

    );

}

export default Goals;