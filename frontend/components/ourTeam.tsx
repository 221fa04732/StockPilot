import { Tooltip } from "@/components/ui/tooltip";
import { Testimonials } from "@/components/ui/animatedtestimonials";


export default function OurTeam(){
    return(<div className="bg-slate-950 text-white w-full flex flex-col justify-center items-center pt-10 pb-40">
        <div className="w-10/12 flex flex-col justify-center items-center gap-6">
            <div className='font-extrabold text-3xl lg:text-5xl'>Meet our team</div>
            <div className="flex flex-row items-center justify-center mt-14 w-full"><Tooltip items={teamList}/></div>
        </div>
        <div className="w-full flex justify-center items-center pt-16">
            <Testimonials testimonials={teamList} />
        </div>
    </div>
)}

type teamType = {
    id : number,
    name : string;
    designation : string;
    src : string;
    quote :string,
    linkedinURL :string,
    twitterURL :string,
    emailURL : string
};

const teamList: teamType[] = [
  {
    id: 1,
    name: "Rahul M. Verma",
    designation: "Founder & CEO",
    src: "/member1.png",
    quote:
      "Rahul studied Public Policy and Economics at IIT Delhi, graduating in 2022. Previously, he co-founded CivicBridge, a startup focused on simplifying government workflows in Indian municipalities. He also worked as a policy advisor at NITI Aayog, contributing to reforms in MSME compliance. Outside of work, Rahul mentors students in debating and has represented India in international Model UN conferences.",
    linkedinURL: "https://www.linkedin.com/in/rahul-verma/",
    twitterURL: "https://x.com/rahulmverma",
    emailURL: "rahul@mockindia.in",
  },
  {
    id: 2,
    name: "Sneha R. Iyer",
    designation: "Founder & CTO",
    src: "/member2.png",
    quote:
      "Sneha graduated from IIT Bombay with a degree in Computer Science, specializing in Artificial Intelligence. She has worked as an ML engineer at Zoho and later led a team at a Bengaluru-based startup focusing on regulatory automation. Sneha has also spoken at PyCon India and is passionate about encouraging more women in tech.",
    linkedinURL: "https://www.linkedin.com/in/sneha-iyer/",
    twitterURL: "https://x.com/sneha_iyer",
    emailURL: "sneha@mockindia.in",
  },
  {
    id: 3,
    name: "Arjun D. Mehta",
    designation: "Founder & Engineer",
    src: "/member3.png",
    quote:
      "Arjun holds a B.Tech in Computer Science from BITS Pilani and previously worked at Google India on scalable backend systems for Google Pay. He’s contributed to open-source projects in the fintech space and is an active participant in the Indian startup ecosystem. Arjun is also a part-time mentor at Scaler Academy.",
    linkedinURL: "https://www.linkedin.com/in/arjun-mehta/",
    twitterURL: "https://x.com/arjundmehta",
    emailURL: "arjun@mockindia.in",
  },
];
