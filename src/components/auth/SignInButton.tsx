"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-10 w-20 animate-pulse rounded-xl bg-zinc-800" />
    );
  }

  if (session?.user) {
    return (
      <button
        onClick={() => signOut()}
        className="flex items-center gap-2 rounded-xl bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:bg-emerald-500 hover:text-zinc-950"
      >
        {session.user.image && (
          <Image
            src={session.user.image}
            alt={session.user.name ?? "User"}
            width={24}
            height={24}
            className="rounded-full"
          />
        )}
        <span>{session.user.name}</span>
        <span className="text-zinc-400 group-hover:text-zinc-600">
          Sign Out
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-emerald-400"
    >
      Sign In
    </button>
  );
}
