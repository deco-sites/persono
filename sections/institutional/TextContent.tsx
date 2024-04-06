export interface Props {
  /**
   * @description Content will be rendered as markdown.
   */
  /** @format html */
  content: string;
}

function TextContent({ content }: Props) {
  return (
    <div class="mb-12 lg:mb-20">
      <div
        dangerouslySetInnerHTML={{
          __html: content.replace(/<p>|<\/p>/g, "\n"),
        }}
      />
    </div>
  );
}

export default TextContent;
