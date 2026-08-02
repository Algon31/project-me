import Button from "./Button";

function EmptyState({ title, description, buttonText, onClick }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/60 p-12 text-center backdrop-blur-xl">
      <h2 className="text-2xl font-black text-white">{title}</h2>
      <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto">{description}</p>

      {buttonText && (
        <Button className="mt-6 max-w-xs mx-auto" onClick={onClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;