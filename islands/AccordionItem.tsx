import { useEffect, useState } from "preact/hooks";

export interface Props {
  /**
   * @description Content will be rendered as markdown.
   * @format rich-textø
   */
  /** @format html */
  content: string;
  title: string;
}

export default function AccordionItem({ title, content }: Props) {
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
    <div class="w-full border-b">
      <button
        onClick={() => {
          setOpenCollapse(!openCollapse);
        }}
        class="flex w-full p-4 items-center justify-between pl-0  "
      >
        <span class="w-full text-start text-base font-normal">{title}</span>
        <span class="text-2xl text-primary">{openCollapse ? "-" : "+"}</span>
      </button>
      <section
        class={`w-full flex flex-col transition-[max-height] duration-700 ease-in-out ${
          openCollapse ? "max-h-screen " : "max-h-0 "
        } overflow-hidden`}
      >
        <div
          class={` px-4 pb-4 ${
            showContent ? "opacity-100" : "opacity-0 "
          } transition-opacity duration-700 ease-in-out`}
          dangerouslySetInnerHTML={{
            __html: content.replace(/<p>|<\/p>/g, "\n"),
          }}
        />
      </section>
    </div>
  );
}
