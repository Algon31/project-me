import { useEffect, useState } from "react";

import MainLayout from "../../../components/layout/MainLayout";

import MetricList from "../components/MetricList";

import { getMetrics } from "../services/settingsService";

function Settings() {

    const [metrics, setMetrics] = useState([]);

    useEffect(() => {

        loadMetrics();

    }, []);

    const loadMetrics = async () => {

        try {

            const data = await getMetrics();

            setMetrics(data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <MainLayout>

            <h1 className="text-3xl font-bold mb-6">

                Settings

            </h1>

            <MetricList metrics={metrics} />

        </MainLayout>

    );

}

export default Settings;