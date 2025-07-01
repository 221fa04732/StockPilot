import { MailCheck, MapPin, Phone } from 'lucide-react'

export default function ContactUs(){
    return(<div className='bg-slate-950 text-white w-full'>
        <div className="w-full flex justify-center items-center">
            <div className="w-10/12 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className='flex flex-col justify-center items-start gap-4'>
                    <img src="/contact.png" alt="contact" className='max-h-40 lg:max-h-96' />
                </div>
                <div className='flex flex-col justify-center items-start gap-4'>
                    <div className='font-extrabold text-3xl lg:text-5xl'>Have a Query? We are here to help</div>
                    <div className='flex justify-center items-center gap-2 mt-2'>
                        <Phone />
                        <div>XXX-XXX-XXXX</div>
                    </div>
                    <div className='flex justify-center items-center gap-2 mt-2'>
                        <MailCheck />
                        <div>stockpilot@gmail.com</div>
                    </div>
                    <div className='flex justify-center items-center gap-2'>
                        <MapPin />
                        <div>New delhi, India 111111</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)}  