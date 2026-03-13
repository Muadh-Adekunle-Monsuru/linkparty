import HeroSection from "@/components/landing/HeroSection"
import HowItWorks from "@/components/landing/HowItWorks"

export default function Page() {
  return (
    <div className="bg-custom-pattern flex min-h-svh flex-col space-y-20 p-4 md:p-10">
      <HeroSection />
      <HowItWorks />
    </div>
  )
}
