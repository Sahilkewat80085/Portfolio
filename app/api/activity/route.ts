import { NextResponse } from "next/server";

const GITHUB_USERNAME =
  process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "Sahilkewat80085";
const LEETCODE_USERNAME = "Sahilkewat8090";

type ActivityDay = {
  date: string;
  github: number;
  leetcode: number;
  total: number;
};

type ActivityResponse = {
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

function startOfUtcDay(date: Date) {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getDateRange() {
  const currentYear = new Date().getUTCFullYear();
  const start = new Date(Date.UTC(currentYear, 0, 1));
  const end = new Date(Date.UTC(currentYear, 11, 31));

  return { start, end };
}

async function fetchGithubActivity(start: Date, end: Date) {
  const url = `https://github.com/users/${GITHUB_USERNAME}/contributions?from=${formatDate(
    start
  )}&to=${formatDate(end)}`;
  const response = await fetch(url, {
    next: { revalidate: 21600 },
    headers: {
      "User-Agent": "portfolio-activity-fetcher",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub fetch failed with ${response.status}`);
  }

  const svg = await response.text();
  const dayRegex =
    /data-date="(\d{4}-\d{2}-\d{2})"[\s\S]*?<tool-tip[\s\S]*?>([^<]*)<\/tool-tip>/g;
  const activity = new Map<string, number>();
  let match: RegExpExecArray | null;

  while ((match = dayRegex.exec(svg)) !== null) {
    const date = match[1];
    const tooltipText = match[2] ?? "";
    if (!date) continue;

    const countMatch = tooltipText.match(/(\d+)\s+contribution/);
    const count = countMatch ? Number(countMatch[1]) : 0;
    activity.set(date, count);
  }

  return activity;
}

async function fetchLeetcodeActivity() {
  const url = "https://leetcode.com/graphql/";
  const query = `
    query userCalendar($username: String!) {
      matchedUser(username: $username) {
        userCalendar {
          submissionCalendar
        }
      }
    }
  `;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
    },
    body: JSON.stringify({
      operationName: "userCalendar",
      query,
      variables: { username: LEETCODE_USERNAME },
    }),
    next: { revalidate: 21600 },
  });

  if (!response.ok) {
    throw new Error(`LeetCode fetch failed with ${response.status}`);
  }

  const json = await response.json();
  const calendar =
    json?.data?.matchedUser?.userCalendar?.submissionCalendar ?? "{}";
  const parsed = JSON.parse(calendar) as Record<string, number>;
  const activity = new Map<string, number>();

  for (const [timestamp, count] of Object.entries(parsed)) {
    const date = formatDate(new Date(Number(timestamp) * 1000));
    activity.set(date, (activity.get(date) ?? 0) + count);
  }

  return activity;
}

function buildMergedDays(
  githubActivity: Map<string, number>,
  leetcodeActivity: Map<string, number>,
  start: Date,
  end: Date
) {
  const days: ActivityDay[] = [];
  const cursor = new Date(start);

  while (cursor <= end) {
    const date = formatDate(cursor);
    const github = githubActivity.get(date) ?? 0;
    const leetcode = leetcodeActivity.get(date) ?? 0;

    days.push({
      date,
      github,
      leetcode,
      total: github + leetcode,
    });

    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return days;
}

export async function GET() {
  const { start, end } = getDateRange();
  const warnings: string[] = [];

  let githubActivity = new Map<string, number>();
  let leetcodeActivity = new Map<string, number>();

  try {
    githubActivity = await fetchGithubActivity(start, end);
  } catch (error) {
    warnings.push(
      error instanceof Error ? error.message : "GitHub activity is unavailable."
    );
  }

  try {
    leetcodeActivity = await fetchLeetcodeActivity();
  } catch (error) {
    warnings.push(
      error instanceof Error
        ? error.message
        : "LeetCode activity is unavailable."
    );
  }

  const days = buildMergedDays(githubActivity, leetcodeActivity, start, end);
  const githubTotal = days.reduce((sum, day) => sum + day.github, 0);
  const leetcodeTotal = days.reduce((sum, day) => sum + day.leetcode, 0);
  const combinedTotal = githubTotal + leetcodeTotal;
  const activeDays = days.filter((day) => day.total > 0).length;
  const maxDayCount = days.reduce((max, day) => Math.max(max, day.total), 0);

  const payload: ActivityResponse = {
    githubUsername: GITHUB_USERNAME,
    leetcodeUsername: LEETCODE_USERNAME,
    days,
    summary: {
      githubTotal,
      leetcodeTotal,
      combinedTotal,
      activeDays,
      maxDayCount,
    },
    warnings,
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "s-maxage=21600, stale-while-revalidate=86400",
    },
  });
}
