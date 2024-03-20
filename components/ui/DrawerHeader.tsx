import Button from "deco-sites/persono/components/ui/Button.tsx";
import Icon from "deco-sites/persono/components/ui/Icon.tsx";

export interface Props {
  onClose: () => void;
  title: string;
}

export function DrawerHeader({ onClose, title }: Props) {
  return (
    <header class="flex justify-between items-center px-4 py-2 border-b border-gray-100 w-full">
      <h3 class="text-xl font-medium">{title}</h3>
      <Button
        class="btn-ghost btn-circle btn-sm hover:text-primary flex items-center justify-center"
        onClick={onClose}
      >
        <Icon id="XMark" fill="black" size={20} strokeWidth={2} />
      </Button>
    </header>
  );
}
