import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Navbar: FC = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/startup-stream.png"
            width={95}
            height={30}
            style={{ width: "auto", height: "auto" }}
            alt="Startup Stream"
          />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">Create</Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span>Logout</span>
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  "use server";

                  await signIn("github");
                }}
              >
                <button type="submit">
                  <span>Login</span>
                </button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
