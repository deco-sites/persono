export interface Props {
  /**
   * @description Content will be rendered as markdown.
   * @format rich-textø
   */
  /** @format html */
  content: string;
  title: string;
}

export function AccordionItem({ title, content }: Props) {
  return (
    <div tabIndex={0} class="collapse collapse-plus border-b border-base-300">
      <input type="checkbox" class="hidden" />
      <div class="collapse-title after:!right-3 after:!top-3 after:text-primary after:scale-150">
        {title}
      </div>
      <div class="collapse-content transition-opacity duration-700 ease-in-out pl-6 px-0 !pb-0">
        <div class="pb-4">
          <div
            dangerouslySetInnerHTML={{
              __html: content.replace(/<p>|<\/p>/g, "\n"),
            }}
          />
        </div>
      </div>
    </div>
  );
}
