import { useEffect, useState } from "react";
import MainLayout from "../../../components/layout/MainLayout";
import PageHeader from "../../../shared/components/PageHeader";
import GoalCard from "../components/GoalCard";
import GoalForm from "../components/GoalForm";
import EmptyState from "../../../shared/components/EmptyState";
import Loader from "../../../shared/components/Loader";

import { getGoals, createGoal, updateGoal, deleteGoal } from "../services/goalService";
import { showSuccess, showError } from "../../../lib/toast";
import { Target, Plus, Trophy, Zap, Shield, Flame } from "lucide-react";

const CATEGORIES = ["All", "Physical", "Mind", "Career", "Life"];

function Goals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [tabFilter, setTabFilter] = useState("active"); // 'active' or 'completed'

  useEffect(() => {
    loadGoals();
  }, []);

  async function loadGoals() {
    try {
      setLoading(true);
      const data = await getGoals();
      setGoals(data || []);
    } catch (error) {
      console.error(error);
      showError("Failed to load Main Quests.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddGoal(goalData) {
    try {
      const created = await createGoal(goalData);
      setGoals((prev) => [created, ...prev]);
      setShowForm(false);
      showSuccess("Main Quest Campaign started!");
    } catch (error) {
      console.error(error);
      showError("Failed to create Main Quest.");
    }
  }

  async function handleUpdateGoal(id, updatedData) {
    try {
      const response = await updateGoal(id, updatedData);
      const updated = response.goal || response;

      setGoals((prev) =>
        prev.map((g) => (g._id === id ? updated : g))
      );

      if (response.xpEarned > 0) {
        showSuccess(`Main Quest Completed! +${response.xpEarned} Boss XP! 🏆`);
      }
    } catch (error) {
      console.error(error);
      showError("Failed to update Main Quest.");
    }
  }

  async function handleDeleteGoal(id) {
    try {
      await deleteGoal(id);
      setGoals((prev) => prev.filter((g) => g._id !== id));
      showSuccess("Main Quest abandoned.");
    } catch (error) {
      console.error(error);
      showError("Failed to delete Main Quest.");
    }
  }

  const activeGoals = goals.filter((g) => !g.completed);
  const completedGoals = goals.filter((g) => g.completed);
  const totalBossXp = completedGoals.reduce((sum, g) => sum + (g.xpReward || 0), 0);

  const displayedGoals = (tabFilter === "active" ? activeGoals : completedGoals).filter(
    (g) => categoryFilter === "All" || (g.category || "Mind") === categoryFilter
  );

  return (
    <MainLayout>
      <PageHeader
        title="Main Quests"
        subtitle="Epic long-term milestones. Break down major goals & claim Boss XP rewards."
      />

      {/* Main Quests Dashboard Summary Header */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-[#0f172a] p-5 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Campaigns</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Target size={18} />
            </div>
          </div>
          <p className="mt-3 text-3xl font-black text-white">{activeGoals.length}</p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-[#0f172a] p-5 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Completed Victories</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Trophy size={18} />
            </div>
          </div>
          <p className="mt-3 text-3xl font-black text-emerald-400">{completedGoals.length}</p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-[#0f172a] p-5 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Boss XP Earned</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Zap size={18} />
            </div>
          </div>
          <p className="mt-3 text-3xl font-black text-amber-400">+{totalBossXp.toLocaleString()} XP</p>
        </div>
      </div>

      {/* Action Header & Toggle Form */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Status Tabs */}
        <div className="flex rounded-2xl border border-slate-800 bg-[#0f172a] p-1">
          <button
            onClick={() => setTabFilter("active")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              tabFilter === "active"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Flame size={14} /> Active Campaigns ({activeGoals.length})
          </button>
          <button
            onClick={() => setTabFilter("completed")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              tabFilter === "completed"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Trophy size={14} /> Hall of Fame ({completedGoals.length})
          </button>
        </div>

        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg hover:bg-blue-500 transition"
        >
          <Plus size={16} /> {showForm ? "Close Form" : "New Main Quest"}
        </button>
      </div>

      {/* Goal Creator Form */}
      {showForm && (
        <div className="mb-8">
          <GoalForm onSubmit={handleAddGoal} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {/* Category Filter Pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`rounded-xl border px-3.5 py-1.5 text-xs font-semibold transition ${
              categoryFilter === cat
                ? "border-blue-500 bg-blue-500/15 text-blue-300"
                : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Goals List */}
      {loading ? (
        <Loader />
      ) : displayedGoals.length === 0 ? (
        <EmptyState
          icon={<Shield size={48} className="text-slate-600" />}
          title={tabFilter === "active" ? "No Active Main Quests" : "No Completed Campaigns Yet"}
          description={
            tabFilter === "active"
              ? "Click 'New Main Quest' to begin a major real-life milestone campaign!"
              : "Complete all milestones of a Main Quest to honor it in your Hall of Fame."
          }
        />
      ) : (
        <div className="space-y-6 pb-24">
          {displayedGoals.map((goal) => (
            <GoalCard
              key={goal._id}
              goal={goal}
              onUpdate={handleUpdateGoal}
              onDelete={handleDeleteGoal}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
}

export default Goals;