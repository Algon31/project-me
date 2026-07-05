import { Link } from "react-router-dom";

import Button from "../../../shared/components/Button";
import Card from "../../../shared/components/Card";

function Landing() {
    return (
        <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-6">

            <Card className="max-w-2xl w-full text-center">

                <h1 className="text-6xl font-bold text-[var(--pcolor)]">

                    Project : ME

                </h1>

                <p className="mt-5 text-xl">

                    Become 1% Better Every Day.

                </p>

                <p className="mt-6 text-[var(--muted)] leading-8">

                    Track your habits.

                    <br/>

                    Measure your progress.

                    <br/>

                    Build consistency.

                </p>

                <div className="mt-10">

                    <Link to="/register">

                        <Button>

                            Get Started

                        </Button>

                    </Link>

                </div>

                <div className="mt-6">

                    <Link

                        to="/login"

                        className="text-[var(--pcolor)] font-semibold"

                    >

                        Already have an account?

                    </Link>

                </div>

            </Card>

        </div>
    );
}

export default Landing;