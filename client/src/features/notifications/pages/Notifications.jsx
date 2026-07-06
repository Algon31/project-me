import { useEffect, useState } from "react";

import MainLayout from "../../../components/layout/MainLayout";

import Loader from "../../../shared/components/Loader";

import PageHeader from "../../../shared/components/PageHeader";

import NotificationList from "../components/NotificationList";

import {

    getNotifications,

} from "../services/notificationService";

function Notifications() {

    const [

        notifications,

        setNotifications,

    ] = useState(null);

    useEffect(() => {

        loadNotifications();

    }, []);

    async function loadNotifications() {

        try {

            const data =

                await getNotifications();

            setNotifications(data);

        }

        catch (err) {

            console.error(err);

        }

    }

    if (!notifications) {

        return (

            <MainLayout>

                <Loader />

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <PageHeader

                title="Notifications"

                subtitle="Everything your character has accomplished."

            />

            <NotificationList

                notifications={notifications}

            />

        </MainLayout>

    );

}

export default Notifications;