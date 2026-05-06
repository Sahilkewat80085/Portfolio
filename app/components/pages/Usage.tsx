import Image from "next/image";
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
            key={item.name}
            className="flex items-center gap-4 dark:bg-primary-bg bg-zinc-100 border dark:border-zinc-800 border-zinc-200 rounded-md px-4 py-3"
          >
            <div className="w-6 h-6 flex-shrink-0 relative">
              <Image
                src={item.logo}
                alt={item.name}
                width={24}
                height={24}
                className="object-contain"
                unoptimized
              />
            </div>
            <span>
              <span className="dark:text-blue-400 text-blue-600 font-medium underline underline-offset-2">
                {item.name}
              </span>
              {" - "}
              {item.description}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
