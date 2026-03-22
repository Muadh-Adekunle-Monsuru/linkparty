"use server"
import cloudinary from "@/lib/cloudinary"
import { fetchMutation, fetchQuery } from "convex/nextjs"
import { api } from "@/convex/_generated/api"
import { nanoid, customAlphabet } from "nanoid"
import { redirect } from "next/navigation"
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

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

  const base64Data = buffer.toString("base64")
  const fileUri = `data:${file.type};base64,${base64Data}`

  // const uploadResult = (await new Promise((resolve, reject) => {
  //   const uploadStream = cloudinary.uploader.upload_stream(
  //     {
  //       resource_type: "raw",
  //       folder: "linkparty_fliers",
  //     },
  //     (error, result) => {
  //       if (error) {
  //         reject(error)
  //       } else {
  //         resolve(result)
  //       }
  //     }
  //   )

  //   uploadStream.end(buffer)
  // })) as any

  try {
    const uploadResult = await cloudinary.uploader.upload(fileUri, {
      folder: "linkparty_fliers",
      // Use "auto" so Cloudinary automatically detects if it's an image/video/raw
      // and appends the correct file extension.
      resource_type: "auto",
    })

    const id = await fetchMutation(api.functions.createEventFunction, {
      code: customAlphabet(alphabet, 6)().toLocaleLowerCase(),
      description,
      event_date,
      is_archived: false,
      is_open: true,
      location,
      name,
      creator_id,
      flier_url: uploadResult.secure_url,
    })

    return id
  } catch (error) {
    console.error("Cloudinary upload failed:", error)
    throw new Error("Image upload failed")
  }
}

export async function get_event_by_code({ formData }: { formData: FormData }) {
  const code = formData.get("code") as string

  const response = await fetchQuery(api.functions.getEventByCode, {
    code: code.trim().toLocaleLowerCase(),
  })

  if (response == "error") {
    throw new Error("Wrong code")
  }

  return response
}
