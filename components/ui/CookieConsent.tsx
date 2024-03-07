import { useId } from "$store/sdk/useId.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";

const script = (id: string) => {
  const callback = () => {
    const KEY = "store-cookie-consent";
    const ACCEPTED = "accepted";
    const HIDDEN = "translate-y-[200%]";

    const consent = localStorage.getItem(KEY);
    const elem = document.getElementById(id);

    if (consent !== ACCEPTED && elem) {
      const accept = elem.querySelector("[data-button-cc-accept]");
      accept && accept.addEventListener("click", () => {
        localStorage.setItem(KEY, ACCEPTED);
        elem.classList.add(HIDDEN);
      });
      const close = elem.querySelector("[data-button-cc-close]");
      close &&
        close.addEventListener("click", () => elem.classList.add(HIDDEN));
      elem.classList.remove(HIDDEN);
    }
  };

  addEventListener("scroll", callback, { once: true });
};

export interface Props {
  text?: string;
  policy?: {
    text?: string;
    link?: string;
  };
  buttons?: {
    allowText: string;
    cancelText?: string;
  };
  layout?: {
    position?: "Expanded";
    content?: "Tiled" | "Piled up";
  };
}

const DEFAULT_PROPS = {
  text:
    "",
  policy: {
    text: "",
    link: "/politica-de-privacidade",
  },
  buttons: {
    allowText: "Aceitar",
    cancelText: "Fechar",
  },
  layout: {
    position: "Expanded",
    content: "Tiled",
  },
};

function CookieConsent(props: Props) {
  const id = useId();
  const { text, policy, buttons, layout } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  return (
    <>
      <div
        id={id}
        class={`
          transform-gpu translate-y-[200%] transition fixed bottom-0 lg:bottom-2 w-screen z-50 lg:flex `}
      >
        <div
          class={`
          p-4 mx-4 my-2 flex flex-col lg:flex-row gap-4 shadow bg-base-100 rounded border border-base-200 
          ${
            !layout?.position || layout?.position === "Expanded"
              ? "lg:container lg:mx-auto"
              : `
            ${layout?.content === "Piled up" ? "lg:w-[480px]" : ""}
            ${
                !layout?.content || layout?.content === "Tiled"
                  ? "lg:w-[520px]"
                  : ""
              }
          `
          }
          ${
            !layout?.content || layout?.content === "Tiled"
              ? "lg:flex-row lg:items-end"
              : ""
          }
          
        `}
        >
          <div
            class={`flex-auto flex flex-col gap-4 ${
              !layout?.content || layout?.content === "Tiled" ? "lg:gap-2" : ""
            }`}
          >
            {text && (
              <div
                class="text-base font-normal lg:w-[66%]"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            )}
          </div>

          <div
            class={`flex flex-col gap-2 md:items-center ${ !layout?.position || layout?.position === "Expanded" ? "md:flex-row" : "" }`}
          >
            <a href={policy.link} class="text-base link link-secondary underline">
              {policy.text}
            </a>
            <button class="btn bg-primary text-white hover:text-black" data-button-cc-accept>
              {buttons.allowText}
            </button>
            <button class="btn btn-outline border-neutral" data-button-cc-close>
              {buttons.cancelText}
            </button>
          </div>
        </div>
      </div>
      <script defer src={scriptAsDataURI(script, id)} />
    </>
  );
}

export default CookieConsent;
