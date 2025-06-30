import { CircleChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function Landing(){
    return (<div className=" w-full flex flex-col justify-center items-center">
        <div className="relative bg-transparent w-full h-[700px]">
            <div className="absolute top-0 -z-20 w-full h-[900px]">
                <Image src="/background1.svg" alt='background1' fill className="object-cover pt-28"/>
            </div>
            <div className="absolute top-0 w-full grid grid-cols-2 -z-10 h-[700px]">
                <Image src="/background2.svg" alt='background2' fill className="object-cover"/>
                <Image src="/background2.svg" alt='background2' fill className="rotate-y-180 object-cover" />
            </div>
            <div className="absolute top-0 right-0 z-10 w-full flex justify-center items-center h-[700px]">
                <div className="w-8/12 flex flex-col justify-center items-center pt-40">
                    <span className="text-white bg-[#FFFFFF15] text-xs md:text-base px-4 py-2 rounded-full text-center mb-10 md:mb-6">Intelligent legal cartography</span>
                    <div className="font-semibold lg:font-extrabold text-2xl lg:text-5xl text-white text-center">Vulcan Technologies</div>
                    <Link href={"/services"}>
                        <Button className='bg-blue-700 hover:bg-blue-600 mt-6'><span className='text-lg'>Explore Our Services</span><CircleChevronRight />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    </div>)
}