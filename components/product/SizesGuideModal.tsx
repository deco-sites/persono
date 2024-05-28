import { SizeGuide } from "deco-sites/persono/loaders/Layouts/SizeGuide.tsx";
import { Signal } from "@preact/signals";
import Icon from "deco-sites/persono/components/ui/Icon.tsx";
import Modal from "deco-sites/persono/components/ui/Modal.tsx";
import { StateUpdater } from "https://esm.sh/v128/preact@10.18.1/hooks/src/index.js";

interface Props {
  segment: string | undefined;
  sizes?: SizeGuide[];
  device: string;
  isOpen: Signal<boolean>;
}

export function SizesGuideModal(
  { sizes, segment, device, isOpen }: Props,
) {
  if (device === "desktop") {
    return (
      <>
        <Modal
          loading="lazy"
          open={isOpen.value}
          onClose={() => isOpen.value = false}
        >
          <div
            class={`${
              segment?.includes("Pijama")
                ? "tall:mt-[calc(13vh)] medium:mt-[calc(13vh+6rem)] small:mt-[calc(10vh+7rem)]"
                : "mt-0"
            } max-h-[85vh] sm:modal-box bg-white sm:h-auto h-full w-full rounded-none flex flex-col sm:rounded-lg !py-0 !px-4 overflow-y-scroll`}
          >
            <div class="flex justify-between items-center py-2 border-b">
              <h3 class="font-medium text-xl">Guia de tamanhos</h3>
              <div class="modal-action mt-0">
                <label
                  onClick={() => {
                    isOpen.value = false;
                  }}
                  class="btn btn-sm btn-circle btn-ghost"
                >
                  <Icon width={20} height={20} id="XMark" />
                </label>
              </div>
            </div>
            <p class="pt-4 pb-8 text-sm text-gray-600">
              Escolha de acordo com o tamanho do(a) {segment ?? "produto"}
            </p>
            <div class="flex flex-col divide-y mb-14">
              {sizes?.map((s) => (
                <div class="flex py-4 text-base justify-between">
                  <span>{s.name}</span>
                  <div class="flex flex-col gap-3">
                    {s.value.split("/").map((sizeSplited) => (
                      <span class="text-gray-600">{sizeSplited}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      </>
    );
  }
  return (
    <div class="bg-white sm:h-auto h-full w-full rounded-none flex flex-col sm:rounded-lg py-0 px-4 overflow-y-scroll">
      <div class="flex justify-between items-center py-2 border-b">
        <h3 class="font-medium text-xl">Guia de tamanhos</h3>
        <div class=" mt-0">
          <label
            onClick={() => {
              isOpen.value = false;
            }}
            class="btn btn-sm btn-circle btn-ghost"
          >
            <Icon width={20} height={20} id="XMark" />
          </label>
        </div>
      </div>
      <p class="pt-4 pb-8 text-sm text-gray-600">
        Escolha de acordo com o tamanho do(a) {segment ?? "produto"}
      </p>
      <ul class="flex flex-col divide-y mb-14">
        {sizes?.map((s) => (
          <li class="list-none flex py-4 text-base justify-between">
            <span>{s.name}</span>
            <div class="flex flex-col gap-3">
              {s.value.split("/").map((sizeSplited) => (
                <span class="text-gray-600">{sizeSplited}</span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
