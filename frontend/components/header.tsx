import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Dropdown from './dropdown'
import Image from 'next/image'

type routetype ={
    "name" : string,
    "route" : string
}

const route : routetype[] = [
    {
        "name" : "Dashboard",
        "route" : "/"
    },{
        "name" : "Product",
        "route" : '/product'
    },{
        "name" : "Supplier",
        "route" : "/supplier"
    },{
        "name" : "Transaction",
        "route" : "/transcation"
    },{
        "name" : "Assistant",
        "route" : "/ai"
    },{
        "name": "More",
        "route": "/more"
    }
]

export default function Header(){
    return(<header className="h-16 w-full flex justify-center fixed top-2 z-50">
        <div className="flex justify-between items-center w-11/12 rounded-lg px-6 border border-slate-900 backdrop-blur-2xl">
            <div className='flex gap-2'>
                <Image src="/icon.png" alt="logo" height={100} width={100} className='max-h-8 max-w-8'/>
                <div className='text-xl font-bold text-white'>StockPilot</div>
            </div>
            <div className='hidden md:flex gap-4 text-base font-semibold'>
                {route.map((items, index)=>(
                    <div key={index}><Link href={items.route} className='text-white hover:text-blue-600 hover:underline'>{items.name}</Link></div>
                ))}
            </div>
            <div className='md:hidden'>
                <Dropdown route={route} />
            </div>    
        </div>
    </header>)
}