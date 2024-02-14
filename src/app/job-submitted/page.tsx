import H1 from "@/components/ui/h1";
import React from "react";

const page = () => {
  return (
    <main className="min-w-5xl m-auto py-8 grid place-items-center text-center h-[calc(100vh-300px)]">
      <div className="space-y-4">
          <H1>Job Submitted</H1>
          <p className="text-muted-foreground">
            Your job has been submitted and is now being processed. It will be
            available on the site once it has been approved.
          </p>
      </div>
    </main>
  );
};

export default page;
