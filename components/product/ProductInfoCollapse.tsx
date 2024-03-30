import { useEffect, useRef, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";

export interface Props {
  title?: string;
  children?: ComponentChildren;
}

const ProductInfoCollapse = ({ title, children }: Props) => {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openCollapse) {
      const height = contentRef.current?.scrollHeight;
      if (height) {
        setContentHeight(height);
        setTimeout(() => {
          setShowContent(true);
        }, 200);
      }
    } else {
      setContentHeight(0);
      setShowContent(false);
    }
  }, [openCollapse]);

  return (
    <div class="w-full">
      <button
        onClick={() => {
          setOpenCollapse(!openCollapse);
        }}
        class="flex w-full p-4 items-center justify-between"
      >
        <span class="w-full text-start text-base font-normal">{title}</span>
        <span class="text-2xl text-primary">{openCollapse ? "-" : "+"}</span>
      </button>
      <section
        class={`w-full flex flex-col transition-height duration-500 ease-linear overflow-hidden`}
        style={{ height: `${contentHeight}px` }}
      >
        <div ref={contentRef} class={` ${
             showContent ? "opacity-100" : "opacity-0 "
          } transition-opacity duration-700 ease-in-out  px-4 pb-4`}>
          {children}
        </div>
      </section>
    </div>
  );
};

export default ProductInfoCollapse;




