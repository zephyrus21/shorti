import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const CreateLinkForm = dynamic(() => import("components/CreateLinkForm"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-900 text-white'>
      <Suspense fallback={`Loading...`}>
        <CreateLinkForm />
      </Suspense>
    </div>
  );
};

export default Home;
