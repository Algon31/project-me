import { useEffect, useState } from "react";

import MainLayout from "../../../components/layout/MainLayout";
import PageHeader from "../../../shared/components/PageHeader";

import QuestRenderer from "../components/QuestRenderer";
import QuestCompletedModal from "../components/QuestCompletedModal";

import { showError } from "../../../lib/toast";

import { getQuests } from "../../settings/services/questService";
import { getToday, saveQuest } from "../services/todayService";

function Today() {
  const [quests, setQuests] = useState([]);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadPage();
  }, []);

  async function loadPage() {
    try {
      const allQuests = await getQuests();
      const today = await getToday();

      const savedQuests = today?.quests || [];

      const merged = allQuests.map((quest) => {
        const saved = savedQuests.find((q) => q.quest._id === quest._id);

        return {
          ...quest,

          completed: saved ? saved.completed : false,

          value: saved
            ? saved.value
            : quest.inputType === "checkbox"
              ? false
              : quest.inputType === "number"
                ? 0
                : "",
        };
      });

      setQuests(merged);
    } catch (error) {
      console.error(error);
    }
  }

  function updateQuest(id, value) {
    setQuests((prev) =>
      prev.map((quest) =>
        quest._id === id
          ? {
              ...quest,
              value,
            }
          : quest,
      ),
    );
  }

  async function completeQuest(quest) {
    try {
      const result = await saveQuest(quest._id, quest.value);

      setQuests((prev) =>
        prev.map((q) =>
          q._id === quest._id
            ? {
                ...q,
                completed: true,
              }
            : q,
        ),
      );

      setResult({
        ...result,
        questName: quest.name,
      });

      setShowModal(true);
    } catch (error) {
      console.error(error);

      showError("Unable to save quest.");
    }
  }

  return (
    <MainLayout>
      <PageHeader
        title="Daily Quests"
        subtitle="Complete quests. Earn XP. Build your character."
      />

      <div
        className="
          mb-8
          rounded-3xl
          bg-[var(--pcolor)]
          p-6
          text-white
        "
      >
        <h2 className="text-4xl font-black">Today's Journey</h2>

        <p className="mt-2 opacity-80">
          Finish your Core Quests to become stronger.
        </p>
      </div>

      <div className="space-y-12 pb-24">
        <div>
          <h2
            className="
        mb-6
        text-2xl
        font-black
        sm:text-3xl
        lg:text-4xl
    "
          >
            💪 Physical Quests
          </h2>

          {quests
            .filter((q) => q.category === "Physical")
            .map((quest) => (
              <QuestRenderer
                key={quest._id}
                quest={quest}
                onChange={(value) => updateQuest(quest._id, value)}
                onSave={() => completeQuest(quest)}
              />
            ))}
        </div>

        <div>
          <h2
            className="
        mb-6
        text-2xl
        font-black
        sm:text-3xl
        lg:text-4xl
    "
          >
            🧠 Mind Quests
          </h2>

          {quests
            .filter((q) => q.category === "Mind")
            .map((quest) => (
              <QuestRenderer
                key={quest._id}
                quest={quest}
                onChange={(value) => updateQuest(quest._id, value)}
                onSave={() => completeQuest(quest)}
              />
            ))}
        </div>
      </div>

      <QuestCompletedModal
        open={showModal}
        result={result}
        onClose={() => setShowModal(false)}
      />
    </MainLayout>
  );
}

export default Today;
