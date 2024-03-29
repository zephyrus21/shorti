import { useState } from "react";
import { NextPage } from "next";
import { trpc } from "utils/trpc";
import copy from "copy-to-clipboard";
import classNames from "classnames";

type Form = {
  slug: string;
  url: string;
};

const CreateLinkForm: NextPage = () => {
  const [form, setForm] = useState<Form>({ slug: "", url: "" });
  const url = window.location.origin;

  const slugCheck = trpc.useQuery(["slugCheck", { slug: form.slug }], {
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const createSlug = trpc.useMutation(["createSlug"]);

  const input =
    "text-black my-1 p-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-orange-500 block w-full rounded-md sm:text-sm focus:ring-1";

  const slugInput = classNames(input, {
    "border-red-500": slugCheck.isFetched && slugCheck.data!.used,
    "text-red-500": slugCheck.isFetched && slugCheck.data!.used,
  });

  if (createSlug.status === "success") {
    return (
      <div className='flex flex-col justify-center items-center h-screen'>
        <div className='flex justify-center items-center'>
          <h1>{`${url}/${form.slug}`}</h1>
          <input
            type='button'
            value='Copy Link'
            className='rounded bg-orange-500 hover:bg-orange-700 transition py-2 px-4 font-bold cursor-pointer ml-4'
            onClick={() => {
              copy(`${url}/${form.slug}`);
            }}
          />
        </div>
        <input
          type='button'
          value='Reset'
          className='rounded bg-orange-500 py-2 px-4 font-bold cursor-pointer m-5'
          onClick={() => {
            createSlug.reset();
            setForm({ slug: "", url: "" });
          }}
        />
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createSlug.mutate({ ...form });
      }}
      className='flex flex-col justify-center h-screen sm:w-2/3 md:w-1/2 lg:w-1/3'>
      {slugCheck.data?.used && (
        <span className='font-medium mr-2 text-center text-red-500'>
          Slug already in use.
        </span>
      )}
      <div className='flex items-center'>
        <span className='font-medium mr-2'>{url}/</span>
        <input
          type='text'
          onChange={(e) => {
            setForm({
              ...form,
              slug: e.target.value,
            });
          }}
          minLength={1}
          placeholder='gg'
          className={slugInput}
          value={form.slug}
          pattern={"^[-a-zA-Z0-9]+$"}
          title='Only alphanumeric characters and hypens are allowed. No spaces.'
          required
        />
      </div>
      <div className='flex items-center'>
        <span className='font-medium mr-2'>Link</span>
        <input
          type='url'
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          placeholder='https://google.com'
          className={input}
          required
        />
      </div>
      <input
        type='submit'
        value='Create'
        className='rounded bg-orange-500 p-1 font-bold cursor-pointer mt-1'
        disabled={slugCheck.isFetched && slugCheck.data!.used}
      />
    </form>
  );
};

export default CreateLinkForm;
