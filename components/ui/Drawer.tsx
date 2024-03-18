import { useId } from "$store/sdk/useId.ts";
import { useSignal } from "@preact/signals";
import { ComponentChildren } from "preact";
import { useEffect } from "preact/hooks";

interface Props {
  onClose?: () => void;
  open?: boolean;
  showHeader?: boolean;
  class?: string;
  loading?: "eager" | "lazy";
  children?: ComponentChildren;
  aside: ComponentChildren;
}

function Drawer(props: Props) {
  const {
    children,
    aside,
    open,
    showHeader,
    onClose,
    class: _class = "",
    loading = "lazy",
  } = props;
  const lazy = useSignal(loading === "lazy" && !open);
  const id = useId();

  useEffect(() => {
    const handler = (e: KeyboardEvent) =>
      (e.key === "Escape" || e.keyCode === 27) && open && onClose?.();

    addEventListener("keydown", handler);

    return () => {
      removeEventListener("keydown", handler);
    };
  }, [open]);

  useEffect(() => {
    lazy.value = false;
  }, []);

  return (
    <div class={`drawer ${_class}`}>
      <input
        id={id}
        checked={open}
        type="checkbox"
        class="drawer-toggle"
        onChange={(e) => e.currentTarget.checked === false && onClose?.()}
      />

      <div class="drawer-content">
        {children}
      </div>

      <aside
        class={`drawer-side sm:overflow-hidden z-50 start-auto ${
          showHeader ? "bottom-0 top-auto" : "h-full"
        }`}

        style={{height: "calc(100% - 120px)"}}
      >
        <label for={id} class="drawer-overlay" aria-label="drawer overlay" />
        {!lazy.value && aside}
      </aside>
    </div>
  );
}

export default Drawer;
