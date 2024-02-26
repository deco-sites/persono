import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";
import { validateEmail } from "$store/sdk/validateEmail.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter({ content, layout = {} }: Props) {
  const { tiled = false } = layout;
  const loading = useSignal(false);
  const sended = useSignal(false);
  const sendable = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!sendable.value) return;

    try {
      loading.value = true;

      const email = (
        e.currentTarget.elements.namedItem("email") as RadioNodeList
      )?.value;

      const result = await invoke["deco-sites/persono"].loaders.newsletter({
        email,
      });

      sended.value = result ? true : false;
    } finally {
      loading.value = false;
    }
  };

  const handleChange: JSX.GenericEventHandler<HTMLInputElement> = (e) => {
    const email = e.currentTarget.value;

    sendable.value = validateEmail(email);
  };

  return (
    <div class="flex lg:flex-nowrap flex-wrap lg:gap-20 gap-6 max-lg:justify-stretch max-lg:items-stretch justify-start">
      <div class="flex flex-col flex-auto lg:gap-4 gap-3 lg:min-w-[400px]">
        {content?.title && (
          <h3 class="text-2xl font-medium">
            {content?.title}
          </h3>
        )}
        {content?.description && (
          <div class="lg:max-w-[400px] w-full text-sm">
            {content?.description}
          </div>
        )}
      </div>
      <div class="flex flex-col gap-4 w-full">
        <form
          class="form-control flex flex-row max-lg:w-full flex-nowrap gap-2"
          onSubmit={handleSubmit}
        >
          <input
            name="email"
            class="flex-auto lg:flex-none lg:max-w-xs lg:w-full w-auto input-bordered input-accent input text-secondary-content bg-secondary placeholder:text-secondary-content disabled:text-secondary-content disabled:bg-secondary"
            placeholder={content?.form?.placeholder || "Digite seu email"}
            onChange={handleChange}
            disabled={sended.value}
          />

          {!sended.value && (
            <button
              type="submit"
              class={`btn btn-accent group text-base ${
                loading.value ? "loading text-white" : ""
              }`}
            >
              <span class="group-disabled:text-[#505050]">
                {content?.form?.buttonText || "Inscrever"}
              </span>
            </button>
          )}

          {sended.value && (
            <p class="flex items-center font-bold">
              <Icon width={27} height={28} strokeWidth={1} id={"Check"} />
              Cadastrado!
            </p>
          )}
        </form>
        {content?.form?.helpText && (
          <div
            class="text-sm"
            dangerouslySetInnerHTML={{ __html: content?.form?.helpText }}
          />
        )}
      </div>
    </div>
  );
}

export default Newsletter;
