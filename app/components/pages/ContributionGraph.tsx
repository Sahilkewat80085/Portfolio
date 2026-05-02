"use client";

import { useEffect, useState } from "react";

type ActivityDay = {
  date: string;
  github: number;
  leetcode: number;
  total: number;
};

type ActivityPayload = {
  githubUsername: string;
  leetcodeUsername: string;
  days: ActivityDay[];
  summary: {
    githubTotal: number;
    leetcodeTotal: number;
    combinedTotal: number;
    activeDays: number;
    maxDayCount: number;
  };
  warnings: string[];
};

const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });

function getCellClass(total: number, maxDayCount: number) {
  if (total === 0 || maxDayCount === 0) {
    return "bg-zinc-200 dark:bg-zinc-800";
  }

  const ratio = total / maxDayCount;

  if (ratio >= 0.75) {
    return "bg-emerald-600 dark:bg-emerald-400";
  }

  if (ratio >= 0.45) {
    return "bg-emerald-500 dark:bg-emerald-500";
  }

  if (ratio >= 0.2) {
    return "bg-emerald-300 dark:bg-emerald-600";
  }

  return "bg-emerald-200 dark:bg-emerald-800";
}

function chunkWeeks(days: ActivityDay[]) {
  const weeks: Array<Array<ActivityDay | null>> = [];

  for (let index = 0; index < days.length; index += 7) {
    const week = days.slice(index, index + 7);

    while (week.length < 7) {
      week.push(null as never);
    }

    weeks.push(week);
  }

  return weeks;
}

export default function ContributionGraph() {
  const [data, setData] = useState<ActivityPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadActivity() {
      try {
        const response = await fetch("/api/activity", {
          cache: "no-store",
        });
        const payload = (await response.json()) as ActivityPayload;

        if (isMounted) {
          setData(payload);
        }
      } catch {
        if (isMounted) {
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadActivity();

    return () => {
      isMounted = false;
    };
  }, []);

  const days = data?.days ?? [];
  const weeks = chunkWeeks(days);
  const summary = data?.summary;
  const monthColumns = weeks.map((week, weekIndex) => {
    const firstDay = week.find(Boolean);
    const monthLabel = firstDay
      ? monthFormatter.format(new Date(firstDay.date))
      : "";
    const previousFirstDay =
      weekIndex > 0 ? weeks[weekIndex - 1].find(Boolean) : null;
    const previousMonthLabel = previousFirstDay
      ? monthFormatter.format(new Date(previousFirstDay.date))
      : "";

    return {
      key: `${weekIndex}-${monthLabel}`,
      label:
        weekIndex === 0 || monthLabel !== previousMonthLabel ? monthLabel : "",
    };
  });

  return (
    <div className="dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 p-6 rounded-lg w-full overflow-x-auto">
      <div className="min-w-[760px]">
        {loading ? (
          <div className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-2">
            {Array.from({ length: 371 }).map((_, index) => (
              <div
                key={index}
                className="w-3 h-3 rounded-sm bg-zinc-200 dark:bg-zinc-800 animate-pulse"
              />
            ))}
          </div>
        ) : days.length > 0 ? (
          <>
            <div
              className="grid gap-2 mb-3"
              style={{
                gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
              }}
            >
              {monthColumns.map((column) => (
                <div
                  key={column.key}
                  className="text-[10px] text-zinc-500 dark:text-zinc-400"
                >
                  {column.label}
                </div>
              ))}
            </div>

            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
              }}
            >
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-rows-7 gap-2">
                  {week.map((day, dayIndex) =>
                    day ? (
                      <div
                        key={day.date}
                        className={`w-3 h-3 rounded-[3px] transition-colors ${getCellClass(
                          day.total,
                          summary?.maxDayCount ?? 0
                        )}`}
                        title={`${day.date}: ${day.total} total (${day.github} GitHub, ${day.leetcode} LeetCode)`}
                      />
                    ) : (
                      <div
                        key={`empty-${weekIndex}-${dayIndex}`}
                        className="w-3 h-3"
                      />
                    )
                  )}
                </div>
              ))}
            </div>

            {summary ? (
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
                <p>GitHub: {summary.githubTotal}</p>
                <p>LeetCode: {summary.leetcodeTotal}</p>
              </div>
            ) : null}

            <p className="mt-3 text-[11px] text-zinc-500 dark:text-zinc-400">
              * the above graph represent the github and leetcode contribution
              of this year
            </p>
          </>
        ) : (
          <p className="text-zinc-500 dark:text-zinc-400">
            Activity data could not be loaded right now.
          </p>
        )}

        {data?.warnings?.length ? (
          <p className="mt-3 text-xs text-amber-600 dark:text-amber-400">
            Live data note: {data.warnings.join(" ")}
          </p>
        ) : null}
      </div>
    </div>
  );
}
