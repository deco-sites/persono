interface Props {
  title?: string;
  alignment: { desktop: "center" | "left"; mobile: "center" | "left" };
}

function ShelfSectionHeader({ title, alignment }: Props) {
  if (title === "") {
    return null;
  }

  return (
    <div
      class={`flex flex-col py-10 ${
        alignment.mobile === "left" ? "text-left" : "text-center"
      }  ${alignment.desktop === "left" ? "md:text-left" : "md:text-center"}`}
    >
      <h1 class="text-black font-medium text-2xl">{title}</h1>
    </div>
  );
}

export default ShelfSectionHeader;
