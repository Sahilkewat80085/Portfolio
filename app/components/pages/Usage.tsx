import { profile } from "@/app/data/portfolio";

export default async function Usage() {
  return (
    <section className="max-w-2xl">
      <div className="mb-8">
        <h2 className="text-4xl mb-4 font-bold tracking-tight">Usage</h2>
        <p className="dark:text-zinc-400 text-zinc-600 max-w-xl">
          Tools, technologies and gadgets I use on a daily basis but not limited
          to.
        </p>
      </div>
      <ul className="space-y-3 dark:text-zinc-400 text-zinc-600">
        {profile.usage.map((item) => (
          <li
            key={item}
            className="dark:bg-primary-bg bg-zinc-100 border dark:border-zinc-800 border-zinc-200 rounded-md px-4 py-2"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
