import { jobTypes } from "@/lib/jobTypes";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Select from "../ui/select";

import prisma from "@/lib/prisma";
import { JobFilterValues, jobFilterSchema } from "@/lib/validations";
import { redirect } from "next/navigation";
import FormSubmitButton from "./FormSubmitButton";

const filterJobs = async (formData: FormData) => {
  "use server";

  const values = Object.fromEntries(formData.entries());

  const { q, type, location, remote } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && {
      q: q.trim(),
    }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/?${searchParams.toString()}`);
};

interface JobFilterSidebarProps {
  defaultValues: JobFilterValues;
}

const JobFilterSidebar = async ({ defaultValues }: JobFilterSidebarProps) => {
  const { q, type, location, remote } = defaultValues;
  const distinctLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              type="text"
              id="q"
              name="q"
              placeholder="Title, company, etc"
              defaultValue={q}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select id="type" name="type" defaultValue={type || ""}>
              <option value="">All Types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" defaultValue={location || ""}>
              <option value="">All locations</option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remote"
              name="remote"
              className="scale-125 accent-black"
              defaultChecked={remote}
            />
            <Label htmlFor="remote">Remote Jobs</Label>
          </div>
          <FormSubmitButton className="w-full">Filter Jobs</FormSubmitButton>
        </div>
      </form>
    </aside>
  );
};

export default JobFilterSidebar;
