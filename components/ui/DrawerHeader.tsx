import Button from "deco-sites/persono/components/ui/Button.tsx";
import Icon from "deco-sites/persono/components/ui/Icon.tsx";

export interface Props {
  onClose: () => void;
  title: string;
}

export function DrawerHeader({ onClose, title }: Props) {
  return (
    <header class="flex justify-between items-center px-4 py-2 border-b border-[#ccc] w-full">
      <h3 class="text-xl font-medium">{title}</h3>
      <Button
        class="btn-ghost btn-circle btn-sm hover:text-primary"
        onClick={onClose}
      >
        <Icon id="XMark" size={20} strokeWidth={2} />
      </Button>
    </header>
  );
}
