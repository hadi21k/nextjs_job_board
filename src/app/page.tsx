import JobFilterSidebar from "@/components/shared/JobFilterSidebar";
import JobResults from "@/components/shared/JobResults";
import H1 from "@/components/ui/h1";
import { JobFilterValues } from "@/lib/validations";
import { Metadata } from "next";

interface HomeProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    page?: string;
  };
}

const getTitle = ({ q, type, location, remote }: JobFilterValues) => {
  const prefix = q
    ? `Search: ${q}`
    : type
      ? `Type: ${type}`
      : remote
        ? "Remote Jobs"
        : "All Jobs";

  const suffix = location ? ` in ${location}` : "";

  return `${prefix}${suffix}`;
};

export function generateMetadata({
  searchParams: { q, type, location, remote },
}: HomeProps): Metadata {
  return {
    title: `${getTitle({
      q,
      type,
      location,
      remote: remote === "true",
    })} | Jobs`,
  };
}

export default function Home({
  searchParams: { q, type, location, remote, page },
}: HomeProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults
          filterValues={filterValues}
          page={page ? parseInt(page) : undefined}
        />
      </section>
    </main>
  );
}
