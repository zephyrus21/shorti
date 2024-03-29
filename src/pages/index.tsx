import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Suspense } from "react";

const CreateLinkForm = dynamic(() => import("components/CreateLinkForm"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-900 text-white'>
      <Head>
        <title>Shorti</title>
      </Head>
      <Suspense fallback={`Loading...`}>
        <CreateLinkForm />
        <a
          className='text-lg p-4 cursor-pointer text-orange-500 hover:underline'
          href='https://github.com/zephyrus21/shorti'>
          Link to code
        </a>
      </Suspense>
    </div>
  );
};

export default Home;
