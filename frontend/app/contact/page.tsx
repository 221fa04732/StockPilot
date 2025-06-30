import { MailCheck, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function ContactUs(){
    return(<div className='bg-slate-950 text-white w-full pt-32'>
        <div className="w-full flex justify-center items-center pb-32">
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
                        <div>vulcantechnologies@gmail.com</div>
                    </div>
                    <div className='flex justify-center items-center gap-2'>
                        <MapPin />
                        <div>Austin TX, USA 78728</div>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full flex justify-center items-center rounded-t-4xl pb-36 pt-20'style={{backgroundImage : "linear-gradient(to right, #001100 0%, #000000 40%, #000000 80%, #001100 100%)"}}>
            <div className='w-10/12 md:w-8/12 grid grid-col-1 lg:grid-cols-2'>
                <div className='flex justify-center items-center'>
                    <div className='text-3xl font-semibold text-white'>Get in touch with us</div>
                </div>
                <div className='flex flex-col justify-center items-center gap-4'>
                    <div className='w-full flex flex-col gap-1'>
                        <Label>Name</Label>
                        <Input type='text' placeholder='john' />
                    </div>
                    <div className='w-full flex flex-col gap-1'>
                        <Label>Email</Label>
                        <Input type='email' placeholder='john@gmail.com' />
                    </div>
                    <div className='w-full flex flex-col gap-1'>
                        <Label>Message</Label>
                        <Textarea placeholder='write yuor message' />
                        <span className='text-xs text-neutral-700'>We will reach back to you within 24hr.</span>
                    </div>
                    <Button className='w-full'>Submit</Button>
                </div>
            </div>
        </div>
    </div>
)}  