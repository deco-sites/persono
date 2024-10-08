import { SizesGuideModal } from "deco-sites/persono/components/product/SizesGuideModal.tsx";
import Drawer from "deco-sites/persono/components/ui/Drawer.tsx";
import { useSignal } from "@preact/signals";

export interface Props {
  categorySizes: {
    name: string;
    value: string;
  }[];
  category: string;
  device: string;
}

function SizeGuideModalButton({
  category,
  device,
  categorySizes,
}: Props) {
  const openModal = useSignal<boolean>(false);

  return (
    <>
      <label
        for="my_modal_6"
        class={`btn justify-start underline btn-link p-0 text-black text-sm font-normal ${
          categorySizes.length <= 0 ? "hidden" : ""
        }`}
        onClick={() => {
          openModal.value = true;
        }}
      >
        Guia de tamanhos
      </label>
      <div>
        {device === "desktop"
          ? (
            <SizesGuideModal
              device={device}
              sizes={categorySizes}
              segment={category}
              isOpen={openModal}
            />
          )
          : (
            <Drawer
              class=""
              onClose={() => openModal.value = false}
              open={openModal.value}
              aside={
                <SizesGuideModal
                  device={device}
                  sizes={categorySizes}
                  segment={category}
                  isOpen={openModal}
                />
              }
            />
          )}
      </div>
    </>
  );
}

export default SizeGuideModalButton;
