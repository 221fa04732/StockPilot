import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Menu } from 'lucide-react'
import { Button } from './ui/button'

type routetype ={
    "name" : string,
    "route" : string
}

export default function Dropdown( props :{
    route : routetype[]
} ){

    return(<DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        {/* todo - handle visible when dropdown is open but window resize */}
        <DropdownMenuContent align="start">
            {props.route.map((items, index) => (
                <DropdownMenuItem key={index}>
                    <Link href={items.route} className='w-full'>{items.name}</Link>
                </DropdownMenuItem>              
            ))}
        </DropdownMenuContent>
    </DropdownMenu>)
}