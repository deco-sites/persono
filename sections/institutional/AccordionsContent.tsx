import AccordionItem from "deco-sites/persono/islands/AccordionItem.tsx";


export interface Props {
  sections: {
    /** @format html */
    sectionText?: string;
    accordions: {
      label: string;
      /**
       * @description Content will be rendered as markdown.
       * @format rich-text
       */
      /** @format html */
      content: string;
    }[];
  }[];
}

function AccordionsContent({ sections }: Props) {
  return (
    <div class="flex flex-col pb-12 lg:pb-20 border-t">
      {sections?.map((section) => (
        <>
          {section?.sectionText && (
            <div
              dangerouslySetInnerHTML={{
                __html: section.sectionText?.replace(/<p>|<\/p>/g, "\n"),
              }}
            />
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
