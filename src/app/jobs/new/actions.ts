"use server";

import { nanoid } from 'nanoid';
import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validations";
import { put } from "@vercel/blob";
import path from 'path';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function createJobPost(formData: FormData) {
    const values = Object.fromEntries(formData.entries());

    const {
        title,
        type,
        companyName,
        companyLogo,
        description,
        salary,
        location,
        locationType,
        applicationUrl,
        applicationEmail
    } = createJobSchema.parse(values);

    const slug = `${toSlug(title)}-${nanoid(10)}`;


    let companyLogoUrl: string | undefined = undefined;

    if (companyLogo) {
        const blob = await put(
            `company-logos/${slug}${path.extname(companyLogo.name)}`,
            companyLogo,
            {
                access: "public",
                addRandomSuffix: false
            }
        )

        companyLogoUrl = blob.url;
    }

    await prisma.job.create({
        data: {
            slug,
            title: title.trim(),
            type,
            companyName: companyName.trim(),
            companyLogoUrl,
            locationType,
            location,
            applicationEmail: applicationEmail?.trim(),
            applicationUrl: applicationUrl?.trim(),
            description: description?.trim(),
            salary: parseInt(salary, 10),
        }
    })

    redirect(`/job-submitted`);

}