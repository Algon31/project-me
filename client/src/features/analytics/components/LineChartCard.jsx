import Card from "../../../shared/components/Card";

function LineChartCard({ title, children }) {
    return (
        <Card className="mb-8">

            <h2 className="mb-6 text-xl font-semibold">
                {title}
            </h2>

            {children}

        </Card>
    );
}

export default LineChartCard;