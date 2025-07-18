import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-purple-100">
      <section className="grid grid-cols-2 h-[50vh]">
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className="text-2xl font-bold">The best URL shortener in the Market</p>
          <p className="px-50 text-center">We are the most starightforward URL shortner in the world. Most of the url shorteners will track you to give your details for login. We understand your needs and hence we have created this URL shortener</p>
          <div className='flex gap-3 justify-center w-full'>
          <Link href="/shorten"><button className='bg-purple-500 shadow-lg p-3 py-1 font-bold rounded-lg cursor-pointer text-white'>Try Now</button></Link>
          <Link href="/github"><button className='bg-purple-500 shadow-lg p-3 py-1 font-bold rounded-lg cursor-pointer text-white'>Github</button></Link>
          </div>
        </div>
        <div className="flex justify-start relative">
          <Image alt="an Image of a vector" src={"/vector.jpg"} fill={true} className="mix-blend-darken" />
        </div>
      </section>
    </main>
  );
}
