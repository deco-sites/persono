import Icon from "$store/components/ui/Icon.tsx";

export interface PaymentItem {
  label: "Diners" | "Elo" | "Mastercard" | "Pix" | "Visa";
}

export default function PaymentMethods(
  { content }: { content?: { title?: string; items?: PaymentItem[] } },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <>
          <div class="hidden md:flex flex-col gap-4">
            {content.title && <h3 class="text-lg">{content.title}</h3>}
            <ul class="flex items-center gap-4 flex-wrap">
              {content.items.map((item) => {
                return (
                  <li
                    class="border"
                    title={item.label}
                  >
                    <Icon
                      width={48}
                      height={32}
                      strokeWidth={1}
                      id={item.label}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <div class="flex flex-col md:hidden gap-4">
            <div class="collapse collapse-arrow text-sm">
              <input type="checkbox" class="min-h-[0]" />
              <div class="collapse-title font-bold min-h-[0] !p-0 flex gap-2">
                {content.title && <h3 class="md:text-lg text-sm">{content.title}</h3>}
              </div>
              <div class="collapse-content">
                <ul class="flex items-center gap-4 flex-wrap pt-2 pl-0">
                  {content.items.map((item) => {
                    return (
                      <li
                        class="border"
                        title={item.label}
                      >
                        <Icon
                          width={48}
                          height={32}
                          strokeWidth={1}
                          id={item.label}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
