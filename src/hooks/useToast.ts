import { useEffect, useState } from "react"

const useToast = ({displayToast}:any) => {
    const [showToast,setShowToast] = useState(displayToast)

    useEffect(() => {
        if(showToast){
            setTimeout(()=>{
                setShowToast(false)
            },5000)
        }
    },[showToast])

    return [showToast,setShowToast]
}

export {useToast}