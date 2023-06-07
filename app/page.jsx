import Link from "next/link";

export default async function Home() {
  // const session = await getServerSession(authOptions);
  // const dataKelas = await getKelas(session?.user?.token);

  // console.log("data", dataKelas);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        BPKP
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          TRAINING IMPLEMENTASI NEXTJS
        </span>
      </h1>
      <div className="mt-5 space-x-5">
        <Link href="/admin">
          <button className="button_link"> Page Admin</button>
        </Link>

        <Link href="/member">
          <button className=" button_link"> Page Member</button>
        </Link>
      </div>
    </section>
  );
}
