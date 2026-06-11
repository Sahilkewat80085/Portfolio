import { profile } from "@/app/data/portfolio";

export default function SoftSkills() {
  return (
    <section className="max-w-2xl mb-16">
      <div className="mb-8">
        <h2 className="font-incognito text-4xl mb-4 font-bold tracking-tight">Soft Skills</h2>
        <p className="dark:text-zinc-400 text-zinc-600 max-w-xl">
          Certain skills I’ve developed along the way that deserve mentioning:
        </p>
      </div>
      <ul className="flex flex-col gap-y-6 list-none dark:text-zinc-400 text-zinc-600">
        {profile.softSkills.map((skill) => (
          <li key={skill.title} className="flex gap-x-3 leading-relaxed">
            <span className="mt-2.5 w-1.5 h-1.5 rounded-sm bg-zinc-400 flex-shrink-0" />
            <p>
              <strong className="dark:text-zinc-200 text-zinc-800 font-bold">
                {skill.title}:
              </strong>{" "}
              {skill.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
