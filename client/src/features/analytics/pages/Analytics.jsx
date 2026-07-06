import { useEffect, useState } from "react";

import MainLayout from "../../../components/layout/MainLayout";

import PageHeader from "../../../shared/components/PageHeader";

import Loader from "../../../shared/components/Loader";

import EmptyState from "../../../shared/components/EmptyState";

import StatCard from "../../../shared/components/StatCard";

import ChartCard from "../components/ChartCard";

import ScoreChart from "../components/ScoreChart";

import CompletionChart from "../components/CompletionChart";

import {

    Trophy,

    Star,

    CalendarDays,

} from "lucide-react";

import {

    getAnalytics,

} from "../services/analyticsService";

function Analytics(){

    const [data,setData]=useState(null);

    useEffect(()=>{

        load();

    },[]);

    async function load(){

        const result=
        await getAnalytics();

        setData(result);

    }

    if(!data){

        return(

            <MainLayout>

                <Loader/>

            </MainLayout>

        );

    }

    if(data.stats.totalDays===0){

        return(

            <MainLayout>

                <EmptyState

                    title="No Progress Yet"

                    description="Complete quests to begin your journey."

                />

            </MainLayout>

        );

    }

    return(

        <MainLayout>

            <PageHeader

                title="Progress"

                subtitle="Watch your character evolve."

            />

            <div className="grid md:grid-cols-4 gap-6 mb-8">

                <StatCard

                    title="Rank"

                    value={data.stats.rank}

                    icon={<Star size={20}/>}

                />

                <StatCard

                    title="Level"

                    value={data.stats.level}

                    icon={<Trophy size={20}/>}

                />

                <StatCard

                    title="Average XP"

                    value={data.stats.averageXP}

                />

                <StatCard

                    title="Tracked Days"

                    value={data.stats.totalDays}

                    icon={<CalendarDays size={20}/>}

                />

            </div>

            <ChartCard title="Daily XP">

                <ScoreChart

                    data={data.xpTimeline}

                />

            </ChartCard>

            <ChartCard title="Quest Completion">

                <CompletionChart

                    data={data.completionTimeline}

                />

            </ChartCard>

        </MainLayout>

    );

}

export default Analytics;