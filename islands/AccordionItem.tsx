import { useEffect, useState } from "preact/hooks";

export interface Props {
  title?: string;
  content: string;
}

const AccordionItem = ({ title, content }: Props) => {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [collapseHeight, setCollapseHeight] = useState("0px");

  useEffect(() => {
    if (openCollapse) {
      const collapse = document.getElementById(title ?? "");
      if (collapse) {
        setCollapseHeight(`${collapse.scrollHeight}px`);
      }
    } else {
      setCollapseHeight("0px");
    }
  }, [openCollapse, title]);

  return (
    <div class="w-full border-b">
      <button
        onClick={() => setOpenCollapse(!openCollapse)}
        class="flex w-full p-4 items-center justify-between pl-0"
      >
        <span class="w-full text-start text-base font-normal">{title}</span>
        <span class="text-2xl text-primary">{openCollapse ? "-" : "+"}</span>
      </button>
      <section
        id={title}
        style={{
          maxHeight: collapseHeight,
          overflow: "hidden",
          transition: "max-height 0.5s ease-in-out",
        }}
      >
        <div
          class={`px-4 pb-4 ${
            openCollapse ? "opacity-100" : "opacity-0"
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
