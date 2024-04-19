import Markdown from "deco-sites/std/components/Markdown.tsx";

export interface Props {
  /**
   * @description Content will be rendered as markdown.
   * @format rich-text
   */
  content: string;
}

function TextContent({ content }: Props) {
  return (
    <div class="mb-12 lg:mb-20">
      <Markdown text={content.replace(/<p>|<\/p>/g, "\n")} />
    </div>
  );
}

export default TextContent;
