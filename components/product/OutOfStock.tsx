import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { Product } from "apps/commerce/types.ts";
import type { JSX } from "preact";
import { validateEmail } from "$store/sdk/validateEmail.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  sku: Product["sku"];
}

function Notify({ sku }: Props) {
  const loading = useSignal(false);
  const sended = useSignal(false);
  const sendable = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email = (
        e.currentTarget.elements.namedItem("email") as RadioNodeList
      )?.value;

      const result = await invoke[
        "deco-sites/persono"
      ].loaders.avaliabilitySubscription({
        email,
        sku,
      });

      sended.value = result ? true : false;
    } finally {
      loading.value = false;
    }
  };

  const handleInput: JSX.GenericEventHandler<HTMLInputElement> = (e) => {
    const email = e.currentTarget.value;

    sendable.value = validateEmail(email);
  };

  return (
    <form class="form-control justify-start gap-2" onSubmit={handleSubmit}>
      <span class="text-base">Este produto está indisponivel no momento</span>
      <span class="text-sm">Avise-me quando estiver disponivel</span>

      <input
        placeholder="Email"
        class="input input-bordered"
        name="email"
        onChange={handleInput}
        disabled={sended.value}
      />

      {!sended.value && (
        <button
          class={`btn ${loading.value ? "loading place-self-center" : ""}`}
          disabled={!sendable.value}
        >
          Enviar
        </button>
      )}

      {sended.value && (
        <span class="place-self-center flex">
          <Icon width={32} height={32} strokeWidth={1} id={"Check"} />
          Cadastrado!
        </span>
      )}
    </form>
  );
}

export default Notify;
