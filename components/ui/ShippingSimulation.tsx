// deno-lint-ignore-file
import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useCart } from "$store/packs/hooks/useCart.ts";
import { ShippingSimulation } from "$store/packs/types.ts";
import { TargetedEvent } from "https://esm.sh/v128/preact@10.18.1/compat/src/index.js";
import { invoke } from "deco-sites/persono/runtime.ts";

export interface Props {
  sku: string;
}

function ShippingContent({
  simulation,
}: {
  simulation: Signal<ShippingSimulation | null>;
}) {
  const methods = simulation.value?.shippingOptions.map((s) => {
    return {
      cost: s.cost,
      maxDays: s.maxBusinessDaysUntilDelivery,
      shippingMethodName: s.shippingMethod.name.split(" ")[1],
    };
  });

  if (simulation.value == null) {
    return null;
  }

  if (!methods || methods.length === 0) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <ul class="flex flex-col bg-base-300 text-base-content rounded-[4px] w-full px-4">
      {methods.map((method, idx) => (
        <li>
          <div class="flex justify-between text-base-content items-center border-base-200 py-4">
            <span class="text-button text-center text-sm">
              {method.shippingMethodName}
            </span>
            <span class="text-button">até {method.maxDays} dias úteis</span>
            <span class="text-base font-semibold text-right">
              {method.cost === 0 ? "Grátis" : formatPrice(method.cost)}
            </span>
          </div>
          <span
            class={`px-4 h-[2px] bg-white rounded ${
              idx == 0 ? "flex" : "hidden"
            }`}
          >
          </span>
        </li>
      ))}
      <span class="text-sm text-[#666] pb-4">
        Os prazos de entrega começam a contar a partir da confirmação do
        pagamento e podem variar de acordo com a quantidade de produtos na
        sacola.
      </span>
    </ul>
  );
}

function ShippingSimulation({ sku }: Props) {
  const loading = useSignal(false);
  const simulateResult = useSignal<ShippingSimulation | null>(null);
  const { simulate, cart } = useCart();

  const handleSimulation = useCallback(
    async (e: TargetedEvent<HTMLFormElement, Event>) => {
      const input = e.currentTarget[0] as HTMLInputElement;
      const postalCode = input.value;

      if (postalCode.length !== 8) {
        return;
      }

      try {
        loading.value = true;
        simulateResult.value = (await invoke({
          key: "deco-sites/persono/loaders/shippingSimulation.ts",
          props: { postalCode, sku: sku },
        })) as ShippingSimulation | null;
      } finally {
        loading.value = false;
      }
    },
    [],
  );

  return (
    <div class="flex flex-col gap-2">
      <div class="flex flex-col text-[#666]">
        <span class="text-base">
          Informe seu CEP para consultar os prazos de entrega
        </span>
      </div>

      <form
        class="join flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSimulation(e);
        }}
      >
        <input
          as="input"
          type="text"
          class="input input-bordered rounded-full w-32"
          placeholder="22291-170"
          maxLength={8}
          size={8}
        />
        <Button
          type="submit"
          loading={loading.value}
          class=" bg-primary px-5 py-2 text-primary-content hover:bg-primary"
        >
          Calcular
        </Button>
      </form>
      <a
        class="underline text-sm"
        href="https://buscacepinter.correios.com.br/app/endereco/index.php"
        target="_blank"
      >
        Não sei meu CEP
      </a>
      <div>
        <div>
          <ShippingContent simulation={simulateResult} />
        </div>
      </div>
    </div>
  );
}

export default ShippingSimulation;
