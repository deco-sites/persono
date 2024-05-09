import ProductInfoCollapse from "deco-sites/persono/islands/ProductInfoCollapse.tsx";

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
  return (
    <div class=" border-b">
    <ProductInfoCollapse title={title}>
         <div
          class={`px-4`}
          dangerouslySetInnerHTML={{
            __html: content.replace(/<p>|<\/p>/g, "\n"),
          }}
        />
    </ProductInfoCollapse>
    </div>
  );
}
