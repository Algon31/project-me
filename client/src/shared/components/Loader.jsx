import SkeletonCard from "./SkeletonCard";

function Loader() {
  return (
    <div className="py-20 text-center text-[var(--muted)]">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}

export default Loader;
