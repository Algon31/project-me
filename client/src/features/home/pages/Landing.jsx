import { Link } from "react-router-dom";

import Button from "../../../shared/components/Button";

function Landing() {

  return (

    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-6">

      <div className="max-w-4xl text-center">

        <p className="uppercase tracking-[0.4em] text-[var(--pcolor)] font-bold">

          PROJECT : ME

        </p>

        <h1 className="mt-6 text-6xl md:text-8xl font-black">

          Become

          <br />

          The Main Character

        </h1>

        <p className="mt-8 text-xl text-[var(--muted)] leading-9">

          Your life becomes an RPG.

          <br />

          Complete quests.

          Gain XP.

          Level up.

          Build your character.

        </p>

        <div className="mt-12 flex flex-col md:flex-row justify-center gap-6">

          <Link to="/register">

            <Button className="px-10">

              Start Journey

            </Button>

          </Link>

          <Link to="/login">

            <Button className="px-10">

              Continue Journey

            </Button>

          </Link>

        </div>

        <div className="mt-20 grid md:grid-cols-4 gap-6">

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-4xl">⚔️</h2>

            <p className="mt-4 font-bold">

              Daily Quests

            </p>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-4xl">⭐</h2>

            <p className="mt-4 font-bold">

              Gain XP

            </p>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-4xl">📈</h2>

            <p className="mt-4 font-bold">

              Level Up

            </p>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-4xl">🏆</h2>

            <p className="mt-4 font-bold">

              Build Character

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Landing;