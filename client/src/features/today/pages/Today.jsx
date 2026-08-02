import { useEffect, useState } from "react";

import MainLayout from "../../../components/layout/MainLayout";
import PageHeader from "../../../shared/components/PageHeader";

import QuestRenderer from "../components/QuestRenderer";
import QuestCompletedModal from "../components/QuestCompletedModal";

import { showError } from "../../../lib/toast";

import { getQuests } from "../../settings/services/questService";
import { getToday, saveQuest } from "../services/todayService";

const CATEGORY_ICONS = {
  Physical: "💪",
  Mind: "🧠",
  Lifestyle: "🌿",
};

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
        const saved = savedQuests.find((q) => {
          if (!q) return false;
          if (typeof q.quest === "string") return q.quest === quest._id;
          return q.quest?._id === quest._id;
        });

        return {
          ...quest,
          completed: saved ? saved.completed : false,
          completedSubQuests: saved?.completedSubQuests || [],
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
      showError("Failed to load today's quests.");
    }
  }

  function updateQuest(id, value, completedSubQuests = []) {
    setQuests((prev) =>
      prev.map((quest) =>
        quest._id === id
          ? {
              ...quest,
              value,
              completedSubQuests,
            }
          : quest,
      ),
    );
  }

  async function completeQuest(quest, completedSubQuests = null) {
    try {
      const subs = completedSubQuests !== null ? completedSubQuests : (quest.completedSubQuests || []);
      const result = await saveQuest(quest._id, quest.value, subs);

      setQuests((prev) =>
        prev.map((q) =>
          q._id === quest._id
            ? {
                ...q,
                completed: result.completed,
                completedSubQuests: subs,
                value: quest.value,
              }
            : q,
        ),
      );

      if (result.completed && result.xpEarned > 0) {
        setResult({
          ...result,
          questName: quest.name,
        });
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
      showError("Unable to save quest.");
    }
  }

  const categories = Array.from(new Set(quests.map((q) => q.category || "General")));

  return (
    <MainLayout>
      <PageHeader
        title="Daily Quests"
        subtitle="Complete quests. Earn XP. Build your character."
      />

      <div className="mb-8 rounded-3xl border border-slate-800 bg-[#0f172a] p-6 text-slate-100 shadow-xl backdrop-blur-xl">
        <h2 className="text-2xl font-black text-white sm:text-3xl">Today's Journey</h2>

        <p className="mt-1.5 text-sm text-slate-400">
          Finish your Core Quests to maintain your daily streak and build character stats.
        </p>
      </div>

      <div className="space-y-10 pb-24">
        {categories.length === 0 ? (
          <p className="text-slate-400 text-sm">No active quests found. Create quests in the Forge to get started!</p>
        ) : (
          categories.map((category) => (
            <div key={category}>
              <h2 className="mb-5 text-xl font-black tracking-tight text-white flex items-center gap-2">
                <span>{CATEGORY_ICONS[category] || "⚔️"}</span>
                <span>{category} Quests</span>
              </h2>

              {quests
                .filter((q) => (q.category || "General") === category)
                .map((quest) => (
                  <QuestRenderer
                    key={quest._id}
                    quest={quest}
                    onChange={(value, subs) => updateQuest(quest._id, value, subs)}
                    onSave={(subs) => completeQuest(quest, subs)}
                  />
                ))}
            </div>
          ))
        )}
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
