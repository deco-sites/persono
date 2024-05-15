import { useState } from "preact/hooks";

export interface Props {
  title?: string;
  content: string;
}

const AccordionItem = (
  { title, content }: Props,
) => {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [showContent, setShowContent] = useState(false);

  return (
    <div class="w-full border-b">
      <button
        onClick={() => {
          setOpenCollapse(!openCollapse);
          setShowContent(!showContent);
        }}
        class="flex w-full p-4 items-center justify-between pl-0  "
      >
        <span class="w-full text-start text-base font-normal">{title}</span>
        <span class="text-2xl text-primary">{openCollapse ? "-" : "+"}</span>
      </button>
      <section
        class={`w-full flex flex-col transition-[max-height] duration-300 ease-in-out ${
          openCollapse ? "max-h-screen " : "max-h-0 "
        } overflow-hidden`}
      >
        <div
          class={` px-4 pb-4 ${
            showContent ? "opacity-100" : "opacity-0 "
          } transition-opacity duration-300 ease-linear`}
          dangerouslySetInnerHTML={{
            __html: content.replace(/<p>|<\/p>/g, "\n"),
          }}
        />
      </section>
    </div>
  );
};

export default AccordionItem;
