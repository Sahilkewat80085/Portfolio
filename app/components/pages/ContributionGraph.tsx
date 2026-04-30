"use client";
import { IoIosAnalytics } from "react-icons/io";

export default function ContributionGraph() {
  return (
    <div className="flex xl:flex-row flex-col gap-4">
      <div className="dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 p-8 rounded-lg w-full">
        <div className="grid grid-cols-12 gap-2">
          {Array.from({ length: 84 }).map((_, index) => (
            <div
              key={index}
              className={`h-4 rounded-sm ${
                index % 7 === 0
                  ? "bg-zinc-400/80 dark:bg-zinc-500/80"
                  : index % 5 === 0
                  ? "bg-zinc-300/80 dark:bg-zinc-600/80"
                  : "bg-zinc-200 dark:bg-zinc-800"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 rounded-lg p-6 max-w-md">
        <div className="flex items-center gap-x-3 mb-3 text-lg font-semibold">
          <IoIosAnalytics />
          Activity Snapshot
        </div>
        <p className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
          This is now a frontend-only placeholder section. We can replace it with
          your GitHub graph, stats, or a custom achievements panel later.
        </p>
      </div>
    </div>
  );
}
