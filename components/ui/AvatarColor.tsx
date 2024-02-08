import { Color } from "deco-sites/persono/loaders/Layouts/Colors.tsx";

type TransformedColors = {
  [key: string]: string[];
};

function transformColors(inputColors: Color[] | undefined) {
  const transformedColors: TransformedColors = {};

  inputColors?.forEach((c) => {
    const key = c.label.toLowerCase().replace(/\s+/g, "-");
    transformedColors[key] = [c.hex, c.ring];
  });

  return transformedColors;
}

interface Props {
  variant?: "active" | "disabled" | "default";
  name?: string;
  content: string;
  color?: Color[];
}

const variants = {
  active:
    "ring ring-2 ring-offset-black ring-offset-1 ring-base-100 ring-inset ",
  disabled:
    `relative after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-red-800 after:w-full after:block after:-rotate-45 after:content-[""]`,
  default: "border border-neutral hover:border-primary",
};

function AvatarColor({ content, variant = "default", color }: Props) {
  const transformedColors = transformColors(color);

  return (
    <div
      class={`placeholder text-xs ${
        !transformedColors[content.toLowerCase()] ? "hidden" : ""
      }`}
    >
      <div
        class={`rounded-full w-8 h-8 p-2 group relative ${variants[variant]}`}
        style={{
          backgroundColor: transformedColors[content.toLowerCase()]
            ? transformedColors[content.toLowerCase()][0]
            : "#000",
        }}
      >
        <span class="rounded shadow border top-9 -right-3 absolute px-2 py-1 text-base-content bg-white hidden group-hover:flex">
          {content}
        </span>
      </div>
    </div>
  );
}

export default AvatarColor;
