import Header from "@/components/landing/Header"
import HeroSection from "@/components/landing/HeroSection"
import HowItWorks from "@/components/landing/HowItWorks"
import Footer from "@/components/landing/Footer"

export default function Page() {
  return (
    <div className="bg-custom-pattern flex min-h-svh flex-col space-y-5 px-2 md:space-y-12 md:px-10">
      <Header />
      <HeroSection />
      <HowItWorks />
      <Footer />
    </div>
  )
}
