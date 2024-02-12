import { Picture, Source } from "apps/website/components/Picture.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  image: {
    mobile: ImageWidget;
    desktop?: ImageWidget;
  };

  text?: string;
  title?: string;
  link?: {
    text: string;
    href: string;
  };
}

const DEFAULT_PROPS: Props = {
  link: {
    href: "#",
    text: "Ver agora",
  },

  image: {
    mobile:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/cac2dc1c-48ac-4274-ad42-4016b0bbe947",
  },
};

export default function FeatureBlogArticle(props: Props) {
  const { link, text, title, image } = { ...DEFAULT_PROPS, ...props };

  return (
    <div class="container">
      <div class="card lg:card-side rounded grid grid-cols-1 lg:grid-cols-[70%_30%]">
        <figure class="relative">
          <Picture>
            <Source
              media="(max-width: 767px)"
              src={image?.mobile}
              width={150}
              height={150}
            />
            <Source
              media="(min-width: 768px)"
              src={image?.desktop ? image?.desktop : image?.mobile}
              width={384}
              height={227}
            />
            <img
              class="w-full object-cover"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={image?.desktop}
              alt={image?.mobile}
              decoding="async"
              loading="lazy"
            />
          </Picture>
        </figure>
        <div class="card-body">
          <h2 class="card-title">{title}</h2>
          <p>{text}</p>
          <div class="card-actions justify-end">
            <a class="btn" href={link?.href}>
              {link?.text}
              <Icon
                class="text-black"
                size={20}
                id="ArrowRight"
                strokeWidth={2}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
