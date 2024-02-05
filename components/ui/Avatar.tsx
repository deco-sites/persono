/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

import { Color } from "deco-sites/persono/loaders/Layouts/Colors.tsx";

interface TransformedColors {
  [key: string]: string[];
}

function transformColors(inputColors: Color[] | undefined) {
  const transformedColors: TransformedColors = {};

  inputColors?.forEach((c) => {
    const key = c.label.toLowerCase().replace(/\s+/g, "-");
    transformedColors[key] = [c.hex, c.ring];
  });

  return transformedColors;
}

const selectedVariants: Record<string, string> = {
  // Color variants - only applied when no color as content is passed
  "active": "bg-black text-base-100",
  "disabled": "bg-neutral-content text-neutral",
  "default": "bg-base-100 text-base-content",
};

interface Props {
  variant?: "active" | "disabled" | "default";
  name?: string;
  content: string;
  color?: Color[];
}

const variants = {
  active: "ring ring-1 ring-offset-base-100 ring-offset-2",
  disabled:
    `relative after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-red-800 after:w-full after:block after:-rotate-45 after:content-[""]`,
  default: "border border-neutral hover:border-primary",
};

function Avatar({ name, content, variant = "default", color }: Props) {
  const transformedColors = transformColors(color);
  return (
    <div class="placeholder text-xs">
      {name == "size"
        ? (
          <div
            class={`rounded-full py-2 px-4 ${
              transformedColors[content] ?? selectedVariants[variant]
            } ${variants[variant]}`}
          >
            <span class="sm:flex hidden">
              {transformedColors[content] ? "" : content}
            </span>
            <span class="sm:hidden flex">
              {transformedColors[content] ? "" : content.substring(0, 2)}
            </span>
          </div>
        )
        : (
          <div
            class={`rounded-full w-8 h-8 p-2 group relative ${
              transformedColors[content] ?? selectedVariants[variant]
            } ${variants[variant]}`}
            style={{
              backgroundColor: transformedColors[content.toLowerCase()]
                ? transformedColors[content.toLowerCase()][0]
                : "#edc",
            }}
          >
            <span class="rounded shadow border top-9 -right-3 absolute px-2 py-1 text-base-content bg-white hidden group-hover:flex">
              {content}
            </span>
          </div>
        )}
    </div>
  );
}

export default Avatar;
