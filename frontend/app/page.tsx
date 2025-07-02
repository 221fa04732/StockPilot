import Dashboard from "@/components/dashboard"
import FAQ from "@/components/faq"
import Landing from "@/components/landing"
import Footer from "@/components/footer"

export default function Home(){
    return(<div>
        <Landing />
        <Dashboard />
        <FAQ />
        <Footer />
    </div>)
}