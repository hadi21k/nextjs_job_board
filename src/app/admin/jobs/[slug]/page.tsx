import JobDetails from "@/components/shared/JobDetails";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

interface Props {
  params: { slug: string };
}

const page = async ({ params: { slug } }: Props) => {
  const job = await prisma.job.findUnique({
    where: {
      slug,
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-start gap-5 px-3 md:flex-row md:items-center">
      <JobDetails job={job} />
      <AdminSidebar job={job} />
    </main>
  );
};

export default page;
