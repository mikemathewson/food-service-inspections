import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: JSX.Element;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col bg-slate-100 min-h-screen">
      <Head>
        <title>NYS Food Service Inspections</title>
      </Head>
      <Header />
      <main className="container mx-auto flex-1 max-w-screen-md py-6 sm:py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
