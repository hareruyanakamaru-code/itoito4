"use server";

import { redirect } from "next/navigation";
import { addApplication, addExperience } from "./experiences";

export async function submitApplication(formData: FormData) {
  const experienceId = formData.get("experienceId") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!experienceId || !name || !email) {
    throw new Error("必須項目が入力されていません");
  }

  addApplication({ experienceId, name, email, message });
  redirect(`/experiences/${experienceId}/apply/done`);
}

export async function submitExperience(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const location = formData.get("location") as string;
  const capacity = Number(formData.get("capacity"));
  const price = Number(formData.get("price"));
  const hostName = formData.get("hostName") as string;
  const hostBio = formData.get("hostBio") as string;
  const tagsRaw = formData.get("tags") as string;

  if (!title || !description || !date || !location || !hostName) {
    throw new Error("必須項目が入力されていません");
  }

  const tags = tagsRaw
    ? tagsRaw
        .split(/[,、]/)
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  addExperience({
    title,
    description,
    category,
    date,
    time,
    location,
    capacity,
    price,
    host: { name: hostName, bio: hostBio },
    tags,
  });

  redirect("/host/done");
}
