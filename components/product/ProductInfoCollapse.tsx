import { useEffect, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";

export interface Props { title?: string; children?: ComponentChildren }



 const ProductInfoCollapse = (
  { title, children }: Props,
) => {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!openCollapse) {
      showContent && setShowContent(false);
      return;
    }

    const delayTimeout = setTimeout(() => {
      setShowContent(true);
    }, 100);

    return () => clearTimeout(delayTimeout);
  }, [openCollapse]);

  return (
    <div class="w-full max-w-lg">
      <button
        onClick={() => {
          setOpenCollapse(!openCollapse);
        }}
        class="flex w-full p-4 items-center justify-between  "
      >
        <span class="w-full text-start text-base font-normal">{title}</span>
        <span class="text-2xl text-primary">{openCollapse ? "-" : "+"}</span>
      </button>
      {openCollapse &&
        (
          <div
            class={`w-full flex flex-col gap-2 px-4 pb-4 ${
              showContent ? "opacity-100" : "opacity-0"
            } transition-opacity duration-700 ease-in-out  `}
          >
            {children}
          </div>
        )}
    </div>
  );
};


export default ProductInfoCollapse