import Card from "../../../shared/components/Card";

function ChartCard({
  title,
  children,
}) {
  return (
    <Card className="mb-8">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">

          {title}

        </h2>

      </div>

      {children}

    </Card>
  );
}

export default ChartCard;