import { SizeGuide } from "deco-sites/persono/loaders/Layouts/SizeGuide.tsx";
import { Signal } from "@preact/signals";
import Icon from "deco-sites/persono/components/ui/Icon.tsx";

interface Props {
  segment: string | undefined;
  sizes?: SizeGuide[];
  device: string;
  showMobile: Signal<boolean>;
}

export function SizesGuideModal(
  { sizes, segment, device, showMobile }: Props,
) {
  if (device === "desktop") {
    return (
      <>
        <input type="checkbox" id="my_modal_6" class="modal-toggle" />
        <div
          class={`modal ${
            segment?.includes("Pijama") ? "tall:mt-[calc(7vh)]" : "mt-0"
          } medium:mt-[calc(10vh+2rem)] small:mt-[calc(10vh+3rem)]`}
          role="dialog"
        >
          <div class="sm:modal-box bg-white sm:h-auto h-full w-full rounded-none flex flex-col sm:rounded-lg py-0 px-4">
            <div class="flex justify-between items-center py-2 border-b">
              <h3 class="font-medium text-xl">Guia de tamanhos</h3>
              <div class="modal-action mt-0">
                <label
                  for="my_modal_6"
                  class="btn btn-sm btn-circle btn-ghost"
                >
                  ✕
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
        </div>
      </>
    );
  }
  return (
    <div class="bg-white sm:h-auto h-full w-full rounded-none flex flex-col sm:rounded-lg py-0 px-4">
      <div class="flex justify-between items-center py-2 border-b">
        <h3 class="font-medium text-xl">Guia de tamanhos</h3>
        <div class=" mt-0">
          <label
            onClick={() => {
              showMobile.value = false;
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
