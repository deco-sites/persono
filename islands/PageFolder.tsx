
import { useEffect, useState } from "preact/compat";
import { ComponentChildren } from "preact";

export interface Props {
    children?: ComponentChildren;
  }


export const PageFolder = ({children}:Props)=>{
    const [showingContent,setCShowingContent] = useState(false)



    useEffect(()=>{
if(showingContent){
    return 
}
      const handleScroll = ()=>{
        window.scrollY > 10 && setCShowingContent(true)
      }


        window.addEventListener("scroll",handleScroll)

        return window.removeEventListener("scroll",handleScroll)
    },[
        showingContent
    ])




    if(!showingContent){
      return null
  }

    return<>{children}</>


}