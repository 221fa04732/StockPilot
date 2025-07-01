import ContactUs from "@/components/contact";
import OurTeam from "@/components/ourTeam";
import { ServiceCard } from "@/components/services";

export default function More(){
    return (<div className="w-full flex flex-col justify-center items-center bg-slate-950 text-white pt-32 pb-40">
        <ServiceCard />
        <OurTeam />
        <ContactUs />
    </div>
  );
}