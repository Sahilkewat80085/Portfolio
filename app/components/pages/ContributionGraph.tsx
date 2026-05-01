"use client";

import { useEffect, useState } from "react";
import { IoIosAnalytics } from "react-icons/io";
import RefLink from "../shared/RefLink";

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
  const weeks: ActivityDay[][] = [];

  for (let index = 0; index < days.length; index += 7) {
    weeks.push(days.slice(index, index + 7));
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

  return (
    <div className="flex xl:flex-row flex-col gap-4">
      <div className="dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 p-6 rounded-lg w-full overflow-x-auto">
        <div className="min-w-[760px]">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
                Merged Activity
              </p>
              <h3 className="font-incognito text-2xl font-semibold">
                GitHub + LeetCode
              </h3>
            </div>
            {summary ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 text-right">
                {summary.combinedTotal} actions across {summary.activeDays} days
              </p>
            ) : null}
          </div>

          {loading ? (
            <div className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-2">
              {Array.from({ length: 371 }).map((_, index) => (
                <div
                  key={index}
                  className="h-3 w-3 rounded-sm bg-zinc-200 dark:bg-zinc-800 animate-pulse"
                />
              ))}
            </div>
          ) : days.length > 0 ? (
            <>
              <div className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-2 mb-3">
                {weeks.map((week, weekIndex) => {
                  const firstDay = week[0];
                  const monthLabel = firstDay
                    ? monthFormatter.format(new Date(firstDay.date))
                    : "";
                  const showLabel =
                    weekIndex === 0 ||
                    monthLabel !==
                      monthFormatter.format(
                        new Date(weeks[weekIndex - 1]?.[0]?.date ?? firstDay.date)
                      );

                  return (
                    <div
                      key={`${weekIndex}-${monthLabel}`}
                      className="text-[10px] text-zinc-500 dark:text-zinc-400"
                    >
                      {showLabel ? monthLabel : ""}
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-flow-col auto-cols-fr gap-2">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-rows-7 gap-2">
                    {week.map((day) => (
                      <div
                        key={day.date}
                        className={`h-3 w-3 rounded-[3px] transition-colors ${getCellClass(
                          day.total,
                          summary?.maxDayCount ?? 0
                        )}`}
                        title={`${day.date}: ${day.total} total (${day.github} GitHub, ${day.leetcode} LeetCode)`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-zinc-500 dark:text-zinc-400">
              Activity data could not be loaded right now.
            </p>
          )}
        </div>
      </div>

      <div className="dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 rounded-lg p-6 max-w-md">
        <div className="flex items-center gap-x-3 mb-3 text-lg font-semibold">
          <IoIosAnalytics />
          Activity Snapshot
        </div>

        <div className="space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <p>
            One merged heatmap combines your public GitHub contributions with
            your LeetCode submission activity, so the section feels fuller and
            visually greener.
          </p>

          {summary ? (
            <>
              <p>GitHub: {summary.githubTotal}</p>
              <p>LeetCode: {summary.leetcodeTotal}</p>
              <p>Combined: {summary.combinedTotal}</p>
              <p>Active days: {summary.activeDays}</p>
            </>
          ) : null}

          {data ? (
            <div className="flex flex-wrap gap-3 pt-1">
              <RefLink
                href={`https://github.com/${data.githubUsername}`}
                className="underline underline-offset-4"
              >
                GitHub Profile
              </RefLink>
              <RefLink
                href={`https://leetcode.com/u/${data.leetcodeUsername}/`}
                className="underline underline-offset-4"
              >
                LeetCode Profile
              </RefLink>
            </div>
          ) : null}

          {data?.warnings?.length ? (
            <p className="text-xs text-amber-600 dark:text-amber-400">
              Live data note: {data.warnings.join(" ")}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
