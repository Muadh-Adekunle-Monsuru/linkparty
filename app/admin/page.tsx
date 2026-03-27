import AdminPageContents from "@/components/dashboard/AdminPageContents"
import Header from "@/components/dashboard/Header"

export default function Page() {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header />
      <AdminPageContents />
    </div>
  )
}
