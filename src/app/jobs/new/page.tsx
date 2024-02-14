import { Metadata } from "next";
import NewJobForm from "./NewJobForm";

export const metadata: Metadata = {
  title: "Create a new job",
};
const Page = () => {
  return <NewJobForm />;
};

export default Page;
