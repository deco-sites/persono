/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string[]> = {
  "azul-clara": ["#87CEFA", "#87CEFA"],
  "azul": ["#4169E1", "#4169E1"],
  "azul-marinho": ["#000080", "#000080"],
  "marinho": ["#000080", "#000080"],
  "fendi": ["#bea07d", "#bea07d"],
  "branca": ["#FFFFFF", "#FFFFFF"],
  "branco": ["#FFFFFF", "#FFFFFF"],
  "cinza": ["#808080", " #808080"],
  "cinza-escura": ["#A9A9A9", " #A9A9A9"],
  "laranja": ["#FFA500", " #FFA500"],
  "marrom": ["#A52A2A", "#A52A2A"],
  "preta": ["#161616", " #161616"],
  "preto": ["#161616", " #161616"],
  "verde-clara": ["#90EE90", " #90EE90"],
  "vermelha": ["#FF0000", " #FF0000"],
  "bege": ["#dac8b3", "#dac8b3"],
};

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
}

const variants = {
  active: "ring ring-1 ring-offset-base-100 ring-offset-2",
  disabled:
    `relative after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-red-800 after:w-full after:block after:-rotate-45 after:content-[""]`,
  default: "border border-neutral hover:border-primary",
};

function Avatar({ name, content, variant = "default" }: Props) {
  console.log({ content, variant });
  return (
    <div class="placeholder text-xs">
      {name == "size"
        ? (
          <div
            class={`rounded-full py-2 px-4 ${
              colors[content] ?? selectedVariants[variant]
            } ${variants[variant]}`}
          >
            <span>
              {colors[content] ? "" : content}
            </span>
          </div>
        )
        : (
          <div
            class={`rounded-full w-8 h-8 p-2 group relative ${
              colors[content] ?? selectedVariants[variant]
            } ${variants[variant]}`}
            style={{
              backgroundColor: colors[content.toLowerCase()]
                ? colors[content.toLowerCase()][0]
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
