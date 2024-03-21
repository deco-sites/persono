
import { useEffect, useState } from "preact/compat";
import { ComponentChildren } from "preact";

export interface Props {
    children?: ComponentChildren;
    keepVisible?:boolean
  }


export const PageFolder = ({children,keepVisible
}:Props)=>{
    const [showingContent,setCShowingContent] = useState(false)



    useEffect(() => {
      if(showingContent || keepVisible ){
        return 
      }

      const handleScroll = () => {
        window.scrollY > 0 && setCShowingContent(true);
      };
  
      window.addEventListener("scroll", handleScroll);
  
      // Retorna uma função de limpeza que remove o evento de rolagem
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);



    if(!showingContent && !keepVisible ){
      return null
  }

    return<>{children}</>


}