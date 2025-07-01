import axios from 'axios'
import { BACKEND_URL } from '@/config'

export default async function Dashboard(){
    const response=await axios.get(`${BACKEND_URL}/api/v1/dashboard`)
    return (<div>
        <div className='bg-white'>DASHBOARD</div>
        <div className="text-white">{response.data.productCnt}</div>
        
    </div>)
}