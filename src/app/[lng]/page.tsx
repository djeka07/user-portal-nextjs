import Link from "next/link";

type HomeProps = {
  params: { lng: string }
}

export default function Home({ params: { lng } }: HomeProps) {
  return (
    <main>
      <div>
        <p>
          <Link href={`${lng}/login`}>Login</Link>
        </p>
      </div>
    </main>
  );
}
