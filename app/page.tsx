"use client";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function Home() {
  const tasks = useQuery(api.tasks.get);
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {tasks?.map((task) => (
        <div key={task._id}>{task.text}</div>
      ))}
    </div>
  );
}
