interface Props {
  title?: string;
  description?: string;
  alignment: "center" | "left";
}

function Header(props: Props) {
  return (
    <>
      {props.title ? (
        <div
          class={`flex flex-col py-10  ${
            props.alignment === "left" ? "text-left" : "text-center"
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

export default Header;
