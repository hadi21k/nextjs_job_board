import z from "zod";
import { jobTypes, locationTypes } from "./jobTypes";

const requiredString = z.string().min(1, "Required");
const numericString = requiredString.regex(/^\d+$/, "Must be a number");

const companyLogoSchema = z.custom<File | undefined>()
    .refine((file) => (
        !file || (file instanceof File && file.type.startsWith("image/"))
    ), "Invalid file type")
    .refine((file) => {
        return !file || file.size < 1024 * 1024 * 2;
    }, "File size must be less than 2MB");

const applicationSchema = z.object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
})
    .refine((val) => val.applicationEmail || val.applicationUrl, {
        message: "Either email or URL is required",
        path: ["applicationEmail"]
    })

const locationSchema = z.object({
    locationType: requiredString.refine((val) => locationTypes.includes(val), "Invalid location type"),
    location: z.string().max(100).optional(),
})
    .refine(data => !data.locationType || data.locationType === "Remote" || data.location, {
        message: "Location is required for non-remote jobs",
        path: ["location"]
    })

export const createJobSchema = z.object({
    title: requiredString.max(100),
    type: requiredString.refine((val) => jobTypes.includes(val), "Invalid job type"),
    companyName: requiredString.max(100),
    companyLogo: companyLogoSchema.optional(),
    description: z.string().max(5000).optional(),
    salary: numericString.max(9, "Number too large"),
})
    .and(applicationSchema)
    .and(locationSchema);

export type CreateJobValues = z.infer<typeof createJobSchema>;

export const jobFilterSchema = z.object({
    q: z.string().optional(),
    type: z.string().optional(),
    location: z.string().optional(),
    remote: z.coerce.boolean().optional(),
})

export type JobFilterValues = z.infer<typeof jobFilterSchema>;