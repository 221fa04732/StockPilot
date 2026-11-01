import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Dashboard from "@/components/dashboard"
import FAQ from "@/components/faq"
import Landing from "@/components/landing"
import Footer from "@/components/footer"

export default function Home(){
    return(<div>
        <Landing />
        <SignedIn><Dashboard /></SignedIn>
        <SignedOut>
            <div className="bg-slate-950 text-white py-12 text-center">
                Sign in to access your private inventory dashboard.
                <div><SignInButton /></div>
            </div>
        </SignedOut>
        <FAQ />
        <Footer />
    </div>)
}