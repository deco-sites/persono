import type { HTML } from "deco-sites/std/components/types.ts";
import Markdown from "deco-sites/std/components/Markdown.tsx";
import { AccordionItem } from "./AccordionItem.tsx";

export interface Props {
  sections: {
    sectionText?: HTML;
    accordions: {
      label: string;
      /**
       * @description Content will be rendered as markdown.
       */
      content: HTML;
    }[];
  }[];
}

function AccordionsContent({ sections }: Props) {
  return (
    <div class="flex flex-col gap-5 pb-12 lg:pb-20">
      {sections?.map((section) => (
        <>
          {section?.sectionText && (
            <Markdown text={section?.sectionText.replace(/<p>|<\/p>/g, "\n")} />
          )}
          {section?.accordions?.map(
            (item, index) => (
              <AccordionItem
                title={item.label}
                content={item.content}
                key={index}
              />
            ),
          )}
        </>
      ))}
    </div>
  );
}

export default AccordionsContent;
