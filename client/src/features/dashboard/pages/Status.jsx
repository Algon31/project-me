import { useEffect, useState } from "react";

import MainLayout from "../../../components/layout/MainLayout";
import Loader from "../../../shared/components/Loader";

import CharacterHeader from "../components/CharacterHeader";
import XPBar from "../components/XPBar";
import StatStrip from "../components/StatStrip";
import AttributeSection from "../components/AttributeSection";
import ActivityFeed from "../components/ActivityFeed";

import { getCharacter } from "../services/characterService";
import { getNotifications } from "@/features/notifications/services/notificationService";
import GoalList from "../components/GoalList";

import { getGoals } from "../services/goalService";

function Status() {
  const [character, setCharacter] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    loadPage();
  }, []);

  async function loadPage() {
    try {
      const [characterData, notificationData, goalData] = await Promise.all([
        getCharacter(),

        getNotifications(),
        getGoals(),
      ]);

      setCharacter(characterData);
      setNotifications(notificationData);
      setGoals(goalData);
    } catch (error) {
      console.error(error);
    }
  }

  if (!character) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div
        className="
        mx-auto
        max-w-6xl
        space-y-8
        pb-24
    "
      >
        <CharacterHeader character={character} user={character.user} />

        <XPBar current={character.xp} required={character.xpRequired} />

        <StatStrip character={character} />

        <div
          className="
        grid
        gap-6
        lg:grid-cols-2
    "
        >
          <AttributeSection
            title="Physical"
            attributes={{
              Strength: character.attributes.Strength,

              Endurance: character.attributes.Endurance,

              Health: character.attributes.Health,
            }}
          />

          <AttributeSection
            title="Mind"
            attributes={{
              Knowledge: character.attributes.Knowledge,

              Focus: character.attributes.Focus,

              Creativity: character.attributes.Creativity,

              Discipline: character.attributes.Discipline,

              Consistency: character.attributes.Consistency,
            }}
          />
        </div>
        <GoalList goals={goals} />
        {Object.keys(character.skills).length > 0 && (
          <AttributeSection title="Skills" attributes={character.skills} />
        )}
      </div>
    </MainLayout>
  );
}

export default Status;
