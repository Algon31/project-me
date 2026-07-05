import Card from "../../../shared/components/Card";

function ChartCard({
    title,
    children,
}) {

    return (

        <Card className="mb-8">

            <h2 className="mb-8 text-2xl font-semibold">

                {title}

            </h2>

            {children}

        </Card>

    );

}

export default ChartCard;