"use server"
import cloudinary from "@/lib/cloudinary"
import { fetchMutation } from "convex/nextjs"
import { api } from "@/convex/_generated/api"
import { nanoid } from "nanoid"

export async function create_event({
  formData,
  creator_id,
}: {
  formData: FormData
  creator_id: string
}) {
  const description = formData.get("description") as string
  const event_date = formData.get("date") as string
  const location = formData.get("location") as string
  const name = formData.get("title") as string

  const file = formData.get("flier") as File
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const uploadResult = (await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "linkparty_fliers",
      },
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    )

    uploadStream.end(buffer)
  })) as any

  const id = await fetchMutation(api.functions.createEventFunction, {
    code: nanoid(6),
    description,
    event_date,
    is_archived: false,
    is_open: false,
    location,
    name,
    creator_id,
    flier_url: uploadResult.secure_url,
  })

  return id
}
