import { useEffect, useState } from "react";

import MainLayout from "../../../components/layout/MainLayout";

import PageHeader from "../../../shared/components/PageHeader";
import Button from "../../../shared/components/Button";
import Card from "../../../shared/components/Card";
import EmptyState from "../../../shared/components/EmptyState";
import ConfirmDialog from "../../../shared/components/ConfirmDialog";

import QuestForm from "../components/QuestForm";
import QuestList from "../components/QuestList";

import { showError, showSuccess } from "@/lib/toast";

import {
    getQuests,
    createQuest,
    updateQuest,
    deleteQuest,
} from "../services/questService";

function Forge() {

    const [quests, setQuests] = useState([]);

    const [editingQuest, setEditingQuest] = useState(null);

    const [open, setOpen] = useState(false);

    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {

        loadQuests();

    }, []);

    const loadQuests = async () => {

        try{

            const data = await getQuests();

            setQuests(data);

        }

        catch(error){

            showError(
                error.response?.data?.message ||
                "Unable to load quests."
            );

        }

    };

    const handleCreateQuest = async(quest)=>{

        try{

            await createQuest(quest);

            showSuccess("Quest Created");

            setOpen(false);

            loadQuests();

        }

        catch(error){

            showError(
                error.response?.data?.message ||
                "Unable to create quest."
            );

        }

    };

    const handleUpdateQuest = async(quest)=>{

        try{

            await updateQuest(
                editingQuest._id,
                quest
            );

            showSuccess("Quest Updated");

            setEditingQuest(null);

            setOpen(false);

            loadQuests();

        }

        catch(error){

            showError(
                error.response?.data?.message ||
                "Unable to update quest."
            );

        }

    };

    const handleDeleteQuest = async()=>{

        try{

            await deleteQuest(deleteId);

            showSuccess("Quest Deleted");

            loadQuests();

        }

        catch(error){

            showError(
                error.response?.data?.message ||
                "Unable to delete quest."
            );

        }

        finally{

            setDeleteId(null);

        }

    };

    return (

        <MainLayout>

            <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

                <PageHeader
                    title="Forge"
                    subtitle="Create the quests that shape your character."
                />

                <Button
                    className="w-full md:w-auto"
                    onClick={()=>{
                        setEditingQuest(null);
                        setOpen(true);
                    }}
                >
                    + Create Quest
                </Button>

            </div>

            {open && (

                <Card className="mb-10">

                    <h2 className="mb-6 text-2xl font-semibold">

                        {
                            editingQuest
                            ? "Edit Quest"
                            : "Create New Quest"
                        }

                    </h2>

                    <QuestForm
                        initialData={editingQuest}
                        onSubmit={
                            editingQuest
                            ? handleUpdateQuest
                            : handleCreateQuest
                        }
                        submitText={
                            editingQuest
                            ? "Update Quest"
                            : "Create Quest"
                        }
                        onCancel={()=>{
                            setEditingQuest(null);
                            setOpen(false);
                        }}
                    />

                </Card>

            )}

            <div className="mb-6">

                <h2 className="text-2xl font-bold">

                    Your Quests

                </h2>

                <p className="text-[var(--muted)]">

                    Every quest contributes towards your character progression.

                </p>

            </div>

            {

                quests.length===0

                ?

                <EmptyState

                    title="No Quests Yet"

                    description="Create your first quest to begin your journey."

                    buttonText="Create Quest"

                    onClick={()=>{
                        setEditingQuest(null);
                        setOpen(true);
                    }}

                />

                :

                <QuestList

                    quests={quests}

                    onEdit={(quest)=>{

                        setEditingQuest(quest);

                        window.scrollTo({

                            top:0,

                            behavior:"smooth",

                        });

                        setOpen(true);

                    }}

                    onDelete={(id)=>{

                        setDeleteId(id);

                    }}

                />

            }

            <ConfirmDialog

                open={deleteId!==null}

                title="Delete Quest?"

                message="This action cannot be undone."

                confirmText="Delete"

                cancelText="Cancel"

                onConfirm={handleDeleteQuest}

                onCancel={()=>setDeleteId(null)}

            />

        </MainLayout>

    );

}

export default Forge;