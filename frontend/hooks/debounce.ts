import { useEffect, useState } from "react"

export const useDebounce = (word : string)=>{
    const [searchWord, setSearchWord] = useState<string>(word)
    useEffect(()=>{
        const time = setTimeout(()=>{
            setSearchWord(word)
        },1000)
        return ()=> clearTimeout(time)
    },[word])
    return searchWord  
}