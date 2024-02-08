/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

import { Size } from "deco-sites/persono/loaders/Layouts/Size.tsx";

const selectedVariants: Record<string, string> = {
  // Color variants - only applied when no color as content is passed
  active: "bg-black text-base-100",
  disabled: "bg-neutral-content text-neutral",
  default: "bg-base-100 text-base-content",
};

interface Props {
  variant?: "active" | "disabled" | "default";
  sizes: Size[];
  content: string;
}

const variants = {
  active: "",
  disabled:
    `relative after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-red-800 after:w-full after:block after:-rotate-45 after:content-[""]`,
  default: "border border-neutral hover:border-primary",
};

function AvatarSize({ content, variant = "default" }: Props) {
  return (
    <div class="placeholder text-xs">
      <div
        class={`rounded-full py-2 px-4 ${selectedVariants[variant]} ${
          variants[variant]
        }`}
      >
        <span class="sm:flex hidden">{content}</span>
        <span class="sm:hidden flex">{content.substring(0, 2)}</span>
      </div>
    </div>
  );
}

export default AvatarSize;
