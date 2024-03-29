/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const selectedVariants: Record<string, string> = {
  // Color variants - only applied when no color as content is passed
  active: "bg-black text-base-100",
  disabled: "text-gray-600 border border-gray-100",
  default: "bg-base-100 text-base-content",
};

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
}

const variants = {
  active: "",
  disabled:
    `relative after:absolute after:left-0 after:top-1/2 after:h-[1px] overflow-hidden after:bg-neutral after:w-full after:block after:-rotate-45 after:content-[""]`,
  default: "border border-neutral hover:border-primary",
};

function AvatarSize({ content, variant = "default" }: Props) {
  return (
    <div class="placeholder text-xs ">
      <div
        class={`rounded-full py-2 px-4 ${selectedVariants[variant]} ${
          variants[variant]
        }`}
      >
        <span>{content}</span>
      </div>
    </div>
  );
}

export default AvatarSize;
