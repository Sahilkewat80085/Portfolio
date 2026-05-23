import Image from "next/image";
import { profile } from "@/app/data/portfolio";

export default async function Usage() {
  return (
    <section className="max-w-6xl">
      <div className="mb-8">
        <h2 className="text-4xl mb-4 font-bold tracking-tight">Usage</h2>
        <p className="dark:text-zinc-400 text-zinc-600 max-w-xl">
          Tools, technologies and gadgets I use on a daily basis but not limited
          to.
        </p>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-6 dark:text-zinc-400 text-zinc-600">
        {profile.usage.map((item) => (
          <li
            key={item.name}
            className="flex items-center gap-4 dark:bg-transparent bg-transparent py-2"
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
            <span className="text-sm">
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
