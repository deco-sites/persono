import { useEffect, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";

export interface Props {
  title?: string;
  children?: ComponentChildren;
}

const ProductInfoCollapse = (
  { title, children }: Props,
) => {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (openCollapse) {
      const timeoutId = setTimeout(() => {
        setShowContent(true);
      }, 100);
      return () => clearTimeout(timeoutId);
    } else {
      setShowContent(false);
    }
  }, [openCollapse]);

  useEffect(() => {
    if (!showContent) {
      const timeoutId = setTimeout(() => {
        setOpenCollapse(false);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [showContent]);

  return (
    <div class="w-full">
      <button
        onClick={() => {
          setOpenCollapse(!openCollapse);
        }}
        class="flex w-full p-4 items-center justify-between  "
      >
        <span class="w-full text-start text-base font-normal">{title}</span>
        <span class="text-2xl text-primary">{openCollapse ? "-" : "+"}</span>
      </button>
      <section
        class={`w-full flex flex-col transition-[max-height] duration-500  ease-linear ${
          openCollapse ? "max-h-screen " : "max-h-0 "
        } overflow-hidden`}
      >
        <div
          class={` px-4 pb-4 ${
            showContent ? "opacity-100" : "opacity-0 "
          } transition-opacity duration-700 ease-in-out`}
        >
          {children}
        </div>
      </section>
    </div>
  );
};

export default ProductInfoCollapse;
