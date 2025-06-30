import { Input } from "./ui/input"
import { Button } from "./ui/button"
import Image from "next/image"

export default function Footer(){
    return(<div className="bg-neutral-950 relative flex justify-center items-center">
        <div className="absolute w-10/12 md:w-8/12 -top-10 z-10 rounded-xl grid grid-col-1 md:grid-cols-3 place-content-center gap-4 p-2 md:p-6 shadow" style={{ backgroundImage: "radial-gradient(circle farthest-corner at -24.7% -47.3%, rgba(6,130,165,1) 0%, rgba(34,48,86,1) 66.8%, rgba(15,23,42,1) 100.2%)"}}>
            <div className="w-full flex justify-center items-center text-white">Follow newletter ?</div>
            <div className="md:col-span-2 col-span-1 flex items-center justify-center">
                <div className="flex items-center gap-2">
                    <Input type="email" placeholder="example@gmail.com"/>
                    <Button type="submit" variant="outline">Subscribe</Button>
                </div>
            </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center text-lg font-semibold text-white absolute top-0 -z-10" style={{ backgroundImage: "radial-gradient(circle farthest-corner at -24.7% -47.3%, rgba(6,130,165,1) 0%, rgba(34,48,86,1) 66.8%, rgba(15,23,42,1) 100.2%)"}}>
            <div className="w-10/12 flex flex-col justify-center items-center pt-20 pb-6">
                <div className="w-full grid grid-cols-1 md:grid-cols-3 place-content-between">
                    <div className="text-xl font-bold flex justify-center md:justify-start">Vulcan Technologies</div>
                    <div className="flex flex-col justify-center items-center md:items-start text-lg">
                        <span className="hover:text-neutral-900 cursor-pointer">Links</span>
                        <span className="hover:text-neutral-900 cursor-pointer">App</span>
                        <span className="hover:text-neutral-900 cursor-pointer">Report</span>
                    </div>
                    <div className="flex flex-col justify-center items-center md:items-start text-lg">
                        <span className="hover:text-neutral-900 cursor-pointer">Legal</span>
                        <span className="hover:text-neutral-900 cursor-pointer">Terms & Conditions</span>
                        <span className="hover:text-neutral-900 cursor-pointer">Privacy Policy</span>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center md:items-start pt-6 pb-12">
                    <div>
                        Follow us
                    </div>
                    <div className="w-full flex justify-center md:justify-start items-end gap-2">
                        <a href="https://www.instagram.com/" target="_blank"><Image src="/instagram.png" alt="instagram" height={50} width={50} className="max-h-6 max-w-6 hover:scale-125" /></a>
                        <a href="https://x.com/" target="_blank"><Image src="/twitter.png" alt="twitter" height={50} width={50} className="max-h-6 max-w-6 hover:scale-125" /></a>
                        <a href="https://www.youtube.com/" target="_blank"><Image src="/youtube.png" alt="youtube" height={50} width={50} className="max-h-6 max-w-6 hover:scale-125" /></a>
                        <a href="https://www.linkedin.com/" target="_blank"><Image src="/linkedin.png" alt="linkedin" height={50} width={50} className="max-h-6 max-w-6 hover:scale-125" /></a>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center text-xs">© 2025 Vulcan Technologies - All right reserved</div>
            </div>
        </div>
    </div>)
}