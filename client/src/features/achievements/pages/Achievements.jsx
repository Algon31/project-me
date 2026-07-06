import { useEffect, useState } from "react";

import MainLayout from "../../../components/layout/MainLayout";
import PageHeader from "../../../shared/components/PageHeader";
import Loader from "../../../shared/components/Loader";

import AchievementGrid from "../components/AchievementGrid";

import { getAchievements } from "../services/achievementService";

function Achievements() {

    const [achievements, setAchievements] = useState(null);

    useEffect(() => {

        loadAchievements();

    }, []);

    async function loadAchievements() {

        try {

            const data = await getAchievements();

            setAchievements(data);

        }

        catch (err) {

            console.error(err);

        }

    }

    if (!achievements) {

        return (

            <MainLayout>

                <Loader />

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <PageHeader

                title="Achievements"

                subtitle="Permanent milestones of your journey."

            />

            <AchievementGrid

                achievements={achievements}

            />

        </MainLayout>

    );

}

export default Achievements;