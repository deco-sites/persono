import { Size } from "deco-sites/persono/loaders/Layouts/Size.tsx";

interface Props {
  segment: string | undefined;
  sizes?: Size[];
}

export function SizesGuideModal({ sizes, segment }: Props) {
  const teste = [{ name: "asd", value: "asdasda" }, {
    name: "asd",
    value: "asdasda",
  }];
  return (
    <>
      <input type="checkbox" id="my_modal_6" class="modal-toggle" />
      <div class="modal" role="dialog">
        <div class="modal-box flex flex-col rounded-lg py-0 px-4">
          <div class="flex justify-between items-center py-2 border-b">
            <h3 class="font-medium text-xl">Guia de tamanhos</h3>
            <div class="modal-action mt-0">
              <label for="my_modal_6" class="btn btn-sm btn-circle btn-ghost">
                ✕
              </label>
            </div>
          </div>
          <p class="pt-4 pb-8 text-sm text-gray-600">
            Escolha de acordo com o tamanho do(a) {segment ?? "produto"}
          </p>
          <div class="flex flex-col divide-y mb-14">
            {teste?.map((s) => (
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
