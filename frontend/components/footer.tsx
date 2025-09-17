
import Image from "next/image"
import Subscribe from "./subscriber"
import Link from "next/link"

export default function Footer(){
    return(<div className="w-full bg-neutral-950 relative flex justify-center items-center">
        <div className="absolute w-10/12 md:w-8/12 -top-10 md:-top-8 z-10 rounded-xl grid grid-col-1 md:grid-cols-3 place-content-center gap-4 p-2 md:p-4 shadow" style={{ backgroundImage: "radial-gradient(circle farthest-corner at -24.7% -47.3%, rgba(6,130,165,1) 0%, rgba(34,48,86,1) 66.8%, rgba(15,23,42,1) 100.2%)"}}>
            <div className="w-full flex justify-center items-center text-white">Follow newletter ?</div>
            <div className="w-full md:col-span-2 col-span-1 flex items-center justify-center">
                <Subscribe />
            </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center text-lg font-semibold text-white absolute top-0 -z-10" style={{ backgroundImage: "radial-gradient(circle farthest-corner at -24.7% -47.3%, rgba(6,130,165,1) 0%, rgba(34,48,86,1) 66.8%, rgba(15,23,42,1) 100.2%)"}}>
            <div className="w-10/12 flex flex-col justify-center items-center pt-20 pb-6">
                <div className="w-full grid grid-cols-1 md:grid-cols-3 place-content-between">
                    <div className="flex flex-row justify-center md:justify-start items-center gap-2">
                        <Image src="/icon.png" alt="logo" height={100} width={100} className='max-h-8 max-w-8'/>
                        <div className="text-xl font-bold flex justify-center md:justify-start">StockPilot</div>
                    </div>
                    <div className="flex flex-col justify-center items-center md:items-start text-blue-400 underline text-base">
                        <span className="hover:text-blue-500 cursor-pointer">Links</span>
                        <span className="hover:text-blue-500 cursor-pointer">App</span>
                        <Link href={'/report'} className="hover:text-blue-500 cursor-pointer">Report</Link>
                    </div>
                    <div className="flex flex-col justify-center items-center md:items-start text-blue-400 underline text-base">
                        <span className="hover:text-blue-500 cursor-pointer">Legal</span>
                        <Link href={'/terms-conditions'} className="hover:text-blue-500 cursor-pointer">Terms & Conditions</Link>
                        <span className="hover:text-blue-500 cursor-pointer">Privacy Policy</span>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center md:items-start pt-2 pb-4">
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
                <div className="w-full flex justify-center items-center text-xs">© 2025 StockPilot - All right reserved</div>
            </div>
        </div>
    </div>)
}