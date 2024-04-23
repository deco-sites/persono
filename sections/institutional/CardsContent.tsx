import Icon, {
  AvailableIcons,
} from "deco-sites/persono/components/ui/Icon.tsx";

export interface Props {
  cards: {
    heading: {
      title: string;
      icon?: AvailableIcons;
    };
    content: {
      subtitle?: string;
      paragraphs?: string[];
    };
    links: {
      label: string;
      url: string;
      icon?: AvailableIcons;
    }[];
  }[];
}

function CardsContent({ cards }: Props) {
  return (
    <div class="flex flex-wrap gap-[30px] pb-12">
      {cards.map((card) => (
        <div class="card card-bordered rounded-lg border-2 border-neutral-100 w-[360px]">
          <div class="card-body gap-4 p-6">
            <div class="flex items-center gap-2 text-primary">
              <Icon
                class=""
                id={card.heading.icon ?? "MapPin"}
                width={24}
                height={24}
              />
              <h6 class="max-w-[87%] break-words text-base">
                {card.heading.title}
              </h6>
            </div>
            <div class="flex flex-col gap-1 text-sm text-black">
              <span class="font-bold">{card.content.subtitle}</span>
              {card.content.paragraphs &&
                card.content.paragraphs.map((paragraph) => (
                  <p class="break-words">{paragraph}</p>
                ))}
              <div class="flex flex-col gap-1 items-start font-bold text-base-content">
                {card.links.map((link) => (
                  <a
                    href={link.url}
                    class="flex items-center gap-2 text-sm"
                  >
                    <Icon
                      id={link.icon ?? "Phone"}
                      width={18}
                      height={18}
                      strokeWidth={2}
                    />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardsContent;
