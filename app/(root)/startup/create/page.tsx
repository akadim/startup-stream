import StartupForm from "@/components/StartupForm";
import React from "react";

const CreateStartupPage = () => {
  return (
    <>
      <section className="green_container !min-h-[230px]">
        <h1 className="heading">Submit Your Startup</h1>
      </section>

      <StartupForm />
    </>
  );
};

export default CreateStartupPage;
