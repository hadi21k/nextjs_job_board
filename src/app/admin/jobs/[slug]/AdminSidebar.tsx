"use client";

import FormSubmitButton from "@/components/shared/FormSubmitButton";
import { Job } from "@prisma/client";
import { useFormState } from "react-dom";
import { approveSubmission, deleteJob } from "./actions";

interface AdminSidebarProps {
  job: Job;
}

const AdminSidebar = ({ job }: AdminSidebarProps) => {
  return (
    <aside className="flex w-[200px] flex-none flex-row items-center gap-5 md:flex-col md:items-stretch">
      {job.approved ? (
        <p className="text-center font-semibold text-green-500">
          This job has been approved
        </p>
      ) : (
        <ApproveSubmissionButton jobId={job.id} />
      )}
      <DeleteJobButton jobId={job.id} />
    </aside>
  );
};

export default AdminSidebar;

interface AdminButtonProps {
  jobId: number;
}

function ApproveSubmissionButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(approveSubmission, undefined);
  return (
    <form action={formAction} className="space-y-1">
      <input type="hidden" name="jobId" value={jobId} />
      <FormSubmitButton className="w-full bg-green-500 hover:bg-green-600">
        Approve Submission
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-center text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}

function DeleteJobButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(deleteJob, undefined);
  return (
    <form action={formAction} className="space-y-1">
      <input type="hidden" name="jobId" value={jobId} />
      <FormSubmitButton className="w-full bg-red-500 hover:bg-red-600">
        Delete Submission
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-center text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}
