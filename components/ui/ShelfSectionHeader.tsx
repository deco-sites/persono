interface Props {
  title?: string;
  description?: string;
  alignment: { desktop: "center" | "left"; mobile: "center" | "left" };
}

function ShelfSectionHeader(props: Props) {
  return (
    <>
      {props.title ? (
        <div
          class={`flex flex-col py-10 ${
            props.alignment.mobile === "left" ? "text-left" : "text-center"
          } md:${
            props.alignment.desktop === "left" ? "text-left" : "text-center"
          }`}
        >
          {props.title && (
            <h1 class="text-black font-medium text-2xl">{props.title}</h1>
          )}
        </div>
      ) : null}
    </>
  );
}

export default ShelfSectionHeader;
