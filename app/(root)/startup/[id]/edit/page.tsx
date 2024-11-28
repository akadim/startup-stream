import StartupForm from "@/components/StartupForm";
import { client } from "@/sanity/lib/client";
import { GET_STARTUP_BY_ID } from "@/sanity/lib/queries";
import React from "react";
import { _isCustomDocumentTypeDefinition } from "sanity";

const EditStartupPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const startup = await client
    .withConfig({ useCdn: false })
    .fetch(GET_STARTUP_BY_ID, { id });
  return (
    <>
      <section className="green_container !min-h-[230px]">
        <h1 className="heading">Edit The Startup</h1>
      </section>

      <StartupForm startup={startup} />
    </>
  );
};

export default EditStartupPage;
