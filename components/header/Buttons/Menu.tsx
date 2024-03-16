import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export default function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      class="btn btn-ghost min-h-0 h-auto p-2 pt-[13px] pl-0"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = !displayMenu.peek();
      }}
    >
      {displayMenu.value
        ? <Icon id="XMark" size={20} strokeWidth={2} />
        : <Icon id="Bars3" size={20} strokeWidth={0.01} />}
    </Button>
  );
}
