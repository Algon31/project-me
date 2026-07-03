import MainLayout from "../../../components/layout/MainLayout";
import Card from "../../../components/ui/Card";

function Dashboard() {
    return (
        <MainLayout>

            <h1 className="text-3xl font-bold mb-8">
                Dashboard
            </h1>

            <div className="grid grid-cols-2 gap-6">

                <Card title="Today's Score">
                    <h1 className="text-5xl font-bold">
                        82
                    </h1>
                </Card>

                <Card title="Current Streak">
                    <h1 className="text-5xl font-bold">
                        🔥 12
                    </h1>
                </Card>

                <Card title="Problems Solved">
                    <h1 className="text-5xl font-bold">
                        15
                    </h1>
                </Card>

                <Card title="IQ Score">
                    <h1 className="text-5xl font-bold">
                        124
                    </h1>
                </Card>

            </div>

        </MainLayout>
    );
}

export default Dashboard;