import { Color } from "deco-sites/persono/loaders/Layouts/Colors.tsx";
import Image from "apps/website/components/Image.tsx";

type TransformedColors = {
  [key: string]: string[];
};

function transformColors(inputColors: Color[] | undefined) {
  const transformedColors: TransformedColors = {};

  inputColors?.forEach((c) => {
    const key = c.label.toLowerCase().replace(/\s+/g, "-");
    transformedColors[key] = [c.hex, c.ring, c.img ?? ""];
  });

  return transformedColors;
}

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
  color?: Color[];
}

const variants = {
  active:
    "ring ring-2 ring-offset-black ring-offset-1 ring-base-100 ring-inset ",
  disabled:
    `relative ring ring-2 ring-offset-neutral ring-offset-1 ring-base-100 ring-inset after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-neutral after:w-full after:block after:-rotate-45 after:content-[""]`,
  default: "border border-neutral hover:border-primary",
};

function AvatarColor(
  { content, variant = "default", color }: Props,
) {
  const transformedColors = transformColors(color);

  return (
    <div
      class={`rounded-full w-8 h-8 p-2 group relative bg-cover bg-center ${
        variants[variant]
      }`}
      style={{
        backgroundColor: transformedColors[content.toLowerCase()]
          ? transformedColors[content.toLowerCase()][0]
          : "#fff",
        backgroundImage: transformedColors[content.toLowerCase()] &&
            transformedColors[content.toLowerCase()][2].length > 2
          ? `url("${transformedColors[content.toLowerCase()][2]}")`
          : null,
      }}
    />
  );
}

export default AvatarColor;
