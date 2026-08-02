import { useState, useEffect } from "react";
import Checkbox from "../../../shared/components/Checkbox";
import Button from "../../../shared/components/Button";
import QuestCard from "./QuestCard";
import { CheckCircle2, ListChecks } from "lucide-react";

function CheckboxQuest({ quest, onChange, onSave }) {
  const [editing, setEditing] = useState(!quest.completed);
  const subQuests = quest.subQuests || [];
  const [completedSubs, setCompletedSubs] = useState(quest.completedSubQuests || []);

  useEffect(() => {
    if (quest.completedSubQuests) {
      setCompletedSubs(quest.completedSubQuests);
    }
  }, [quest.completedSubQuests]);

  useEffect(() => {
    setEditing(!quest.completed);
  }, [quest.completed]);

  const toggleSubQuest = (subTitle) => {
    let next;
    if (completedSubs.includes(subTitle)) {
      next = completedSubs.filter((s) => s !== subTitle);
    } else {
      next = [...completedSubs, subTitle];
    }
    setCompletedSubs(next);
    const hasItems = next.length > 0;
    onChange(hasItems, next);
  };

  const handleSave = async () => {
    await onSave(completedSubs);
    const isCompletedNow = subQuests.length > 0 ? completedSubs.length > 0 : Boolean(quest.value);
    setEditing(!isCompletedNow);
  };

  return (
    <QuestCard quest={quest}>
      {subQuests.length > 0 && (
        <div className="mb-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            <span className="flex items-center gap-1.5 text-blue-400">
              <ListChecks size={16} /> Sub-Quests Checklist
            </span>
            <span className="font-mono text-slate-300">
              {completedSubs.length} / {subQuests.length} Selected
            </span>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            {subQuests.map((subTitle) => {
              const isChecked = completedSubs.includes(subTitle);
              return (
                <button
                  type="button"
                  key={subTitle}
                  disabled={!editing}
                  onClick={() => toggleSubQuest(subTitle)}
                  className={`flex items-center justify-between rounded-xl border p-3 text-sm font-semibold transition ${
                    isChecked
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                      : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-xs">🎯</span>
                    <span className="truncate">{subTitle}</span>
                  </div>

                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-lg border text-xs ${
                      isChecked
                        ? "border-emerald-500 bg-emerald-500 text-white font-bold"
                        : "border-slate-700 bg-slate-950"
                    }`}
                  >
                    {isChecked && "✓"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {editing ? (
        <div className="flex items-center justify-between gap-4">
          {subQuests.length === 0 && (
            <div className="flex items-center gap-3">
              <Checkbox
                checked={Boolean(quest.value)}
                onClick={() => onChange(!quest.value, completedSubs)}
              />
              <span className="text-sm font-medium text-slate-300">
                {quest.value ? "Marked as Completed" : "Mark as Completed"}
              </span>
            </div>
          )}

          <Button className="w-full sm:w-auto" onClick={handleSave}>
            Save Quest Progress
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
            <CheckCircle2 size={18} />
            <span>Completed Today ({completedSubs.length > 0 ? `${completedSubs.length} Sub-Quests` : "Full Quest"})</span>
          </div>

          <button
            onClick={() => setEditing(true)}
            className="text-xs font-semibold text-slate-400 hover:text-white underline"
          >
            Update Progress
          </button>
        </div>
      )}
    </QuestCard>
  );
}

export default CheckboxQuest;