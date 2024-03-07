interface Props {
  title?: string;
  description?: string;
  alignment?: "center" | "left";
  colorReverse?: boolean;
  fontSize?: "Large" | "Normal";
}

function Header(props: Props) {
  return (
    <>
      {props.title || props.description
        ? (
          <div
            class={`flex flex-col gap-2 ${
              props.alignment === "left"
                ? "text-left ml-6 md:ml-0"
                : "text-center"
            }`}
          >
            {props.title && (
              <h1 class="flex md:justify-center text-2xl font-medium  leading-8 lg:leading-10 text-black ">
                {props.title}
              </h1>
            )}
            {props.description && (
              <h2
                class={`
                  leading-6 lg:leading-8
                  ${
                  props.colorReverse ? "text-primary-content" : "text-neutral"
                }
                  text-base
                `}
              >
                {props.description}
              </h2>
            )}
          </div>
        )
        : null}
    </>
  );
}

export default Header;
