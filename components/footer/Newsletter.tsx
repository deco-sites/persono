import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";

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

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.newsletter.subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div class="flex lg:flex-nowrap flex-wrap md:gap-20 gap-6 max-md:justify-stretch max-md:items-stretch">
      <div class="flex flex-col md:gap-4 gap-3">
        {content?.title && (
          <h3 class="text-2xl font-medium">
            {content?.title}
          </h3>
        )}
        {content?.description && (
          <div class="md:max-w-[400px] w-full text-sm">
            {content?.description}
          </div>
        )}
      </div>
      <div class="flex flex-col gap-4 max-md:w-full">
        <form
          class="form-control flex flex-row max-md:w-full flex-nowrap gap-2"
          onSubmit={handleSubmit}
        >
          <input
            name="email"
            class="flex-auto md:flex-none md:max-w-xs w-auto input-bordered input-accent input text-secondary-content bg-secondary placeholder:text-secondary-content"
            placeholder={content?.form?.placeholder || "Digite seu email"}
          />
          <button
            type="submit"
            class="btn btn-accent group disabled:bg-white text-base"
            disabled={loading}
          >
            <span class="group-disabled:loading group-disabled:text-black">
              {content?.form?.buttonText || "Inscrever"}
            </span>
          </button>
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
