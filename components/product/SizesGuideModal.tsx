interface Props {
  segment: string | undefined;
  sizes?: string;
}

export function SizesGuideModal({ segment }: Props) {
  return (
    <>
      <input type="checkbox" id="my_modal_6" class="modal-toggle" />
      <div class="modal" role="dialog">
        <div class="modal-box flex flex-col divide-y rounded-lg py-0 px-4">
          <div class="flex justify-between items-center py-2 ">
            <h3 class="font-medium text-xl">Guia de tamanhos</h3>
            <div class="modal-action mt-0">
              <label for="my_modal_6" class="btn btn-sm btn-circle btn-ghost">
                ✕
              </label>
            </div>
          </div>
          <p class="py-4">
            Escolha de acordo com o tamanho do(a) {segment ?? "produto"}
          </p>
        </div>
      </div>
    </>
  );
}
