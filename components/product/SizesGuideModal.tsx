import { SizeGuide } from "deco-sites/persono/loaders/Layouts/SizeGuide.tsx";
import { pijamaSizes } from "deco-sites/persono/components/product/ProductSizeVariantSelector.tsx";

interface Props {
  segment: string | undefined;
  sizes?: SizeGuide[];
  device: string;
  pijamaSizes: pijamaSizes[];
}

export function SizesGuideModal(
  { sizes, segment, device, pijamaSizes }: Props,
) {
  return (
    <>
      <input type="checkbox" id="my_modal_6" class="modal-toggle" />
      <div
        class={`modal ${
          device == "desktop"
            ? " tall:mt-0 medium:mt-[calc(10vh+2rem)] small:mt-[calc(10vh+3rem)]"
            : ""
        }`}
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
            {pijamaSizes.length > 0
              ? pijamaSizes.map((p) => (
                <div class="flex py-4 text-base justify-between">
                  <span>{p.size}</span>
                  <div
                    class={`flex ${
                      device == "desktop" ? "" : "flex-col"
                    }  gap-3`}
                  >
                    {device == "desktop"
                      ? (
                        <span class="text-gray-600">
                          {p.valueDesktop}
                        </span>
                      )
                      : p.valueMobile.map((v) => (
                        <span class="text-gray-600">
                          {v}
                        </span>
                      ))}
                  </div>
                </div>
              ))
              : sizes?.map((s) => (
                <div class="flex py-4 text-base justify-between">
                  <span>{s.name}</span>
                  <span class="text-gray-600">{s.value}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
