import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import Social, {
  SocialItem,
} from "deco-sites/persono/components/footer/Social.tsx";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";

export interface ImageObject {
  url: ImageWidget;
  alt: string;
}

export interface SiteNavigationElementLeaf {
  /** @description An image of the item. This can be a {@link https://schema.org/URL URL} or a fully described {@link https://schema.org/ImageObject ImageObject}. */
  image?: ImageObject;
  /** @description The name of the item. */
  label?: string;
  /** @description URL of the item. */
  url?: string;
}

export interface SiteNavigationElement extends SiteNavigationElementLeaf {
  children?: SiteNavigationElementLeaf[];
}

export type FastLink = Omit<SiteNavigationElementLeaf, "image"> & {
  icon?: AvailableIcons;
};

export interface Props {
  items?: SiteNavigationElement[];
  fastLinks?: FastLink[];
  socialItems?: SocialItem[];
}

const TEXT = [
  "text-base",
  "text-sm",
  "text-sm",
];

const CHILD_TITLE = [
  "!p-4",
  "!py-4 !px-0",
  "!py-4 !px-0",
];

function MenuItem(
  { item, child = 0 }: { item: SiteNavigationElement; child?: number },
) {
  const hasChildren = !!item.children?.length;
  return (
    <div
      class={`${
        hasChildren ? "collapse collapse-plus" : ""
      } relative items-start`}
    >
      {hasChildren
        ? (
          <>
            <input type="checkbox" class="w-1/4 h-full justify-self-end" />
            <div class="collapse-content">
              <ul>
                {item.children?.map((node, index) => (
                  <li key={index}>
                    <MenuItem item={node} child={child + 1} />
                  </li>
                ))}
              </ul>
            </div>
          </>
        )
        : null}
      <div
        class={`${
          CHILD_TITLE[child]
        } collapse-title after:!w-5 after:!h-5 after:!static after:!leading-5 after:!text-center after:!text-2xl flex items-center justify-between`}
      >
        <a class={`${TEXT[child]}`} href={item.url}>{item.label}</a>
      </div>
    </div>
  );
}

function Menu({ items = [], fastLinks = [], socialItems = [] }: Props) {
  return (
    <div class="flex flex-col h-full">
      <ul class="px-4 flex-grow flex flex-col divide-y divide-[#D4DBD7]">
        {items?.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>

      <ul class="px-4 flex flex-col py-2 bg-base-200">
        {fastLinks?.map((link) => (
          <li>
            <a
              class="flex items-center gap-2 p-4"
              href={link.url}
            >
              {link.icon
                ? <Icon id={link.icon} size={20} strokeWidth={2} />
                : null}
              <span class="text-sm">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
      <div class="bg-secondary text-secondary-content flex flex-row justify-between items-center pt-6 pb-5 px-4">
        <a
          href="https://deco.cx/"
          target="_blank"
          class="flex items-center gap-1 text-sm"
        >
          <span>Powered by</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 58 20"
            width={58}
            height={20}
            stroke="none"
            fill="none"
          >
            <path
              d="M49.5359 16.9432C47.3666 16.9432 46.9948 14.8019 47.6797 12.7178C48.2221 11.0615 49.5066 9.31991 51.4201 9.31991C53.676 9.31991 53.9039 11.6038 53.247 13.6026C52.6753 15.3162 51.3908 16.9432 49.5359 16.9432ZM48.879 19.9973C52.6473 19.9973 56.0159 17.9133 57.3578 14.1449C58.7569 10.1767 57.1859 6.2085 52.0477 6.2085C47.9369 6.2085 44.7962 8.77758 43.5969 12.1755C42.2551 16.0011 43.7115 19.9973 48.879 19.9973ZM36.3747 19.9973C37.8591 19.9973 39.3729 19.6829 40.4282 19.2271C40.8 18.1998 40.828 17.2004 40.5428 16.201C39.8006 16.4862 38.7732 16.7727 37.7165 16.7727C34.861 16.7727 34.6051 14.6606 35.2048 12.8617C35.8617 10.9496 37.574 9.40786 40.287 9.40786C41.0012 9.40786 41.6861 9.52246 42.1138 9.77963C42.856 8.78025 43.2838 7.78086 43.3704 6.7535C42.7428 6.46834 41.6861 6.21117 40.3163 6.21117C35.863 6.21117 32.3505 8.80956 31.0953 12.406C29.896 15.8039 30.8101 20 36.3774 20L36.3747 19.9973ZM21.0442 11.8037C21.8143 10.0901 23.0136 9.09206 24.5846 9.09206C25.9838 9.09206 26.2116 9.86225 25.9838 10.4619C25.6413 11.2894 24.47 11.8037 21.0442 11.8037ZM22.2714 19.9973C23.7278 19.9973 25.7826 19.7122 27.4962 18.8554C27.7813 17.9133 27.7534 16.9712 27.4389 15.9998C26.3542 16.5421 24.8405 16.8566 23.4707 16.8566C21.4439 16.8566 20.3299 16.1997 20.3592 14.5447C25.8972 14.6873 28.7807 13.6879 29.7228 11.2334C30.6649 8.7496 29.0379 6.2085 25.1829 6.2085C21.0721 6.2085 18.046 9.14935 16.932 12.3181C15.7621 15.6867 16.5043 19.9973 22.2701 19.9973H22.2714ZM5.72293 19.9973C9.52059 19.9973 11.6806 18.2557 14.1924 12.9177C15.5622 9.97684 16.7335 7.09329 18.0753 4.23905L19.6743 4.7534C20.1021 4.89598 20.3313 4.6388 20.1314 4.23905L18.1899 0.270827C18.0473 -0.0143302 17.7329 -0.0436454 17.533 0.0429678L12.708 1.86984C12.3082 2.01242 12.3362 2.38419 12.7359 2.49745L14.1631 2.95451C12.9931 5.6102 11.5367 9.60641 10.3654 12.1182C9.05155 14.9165 8.39595 16.8859 6.16933 16.8859C3.9427 16.8859 3.57093 15.1443 4.51301 12.6605C5.59768 9.77697 7.42455 8.92016 9.5086 9.51979C10.0802 8.72028 10.508 7.52103 10.6785 6.43636C10.0789 6.26447 9.36469 6.2085 8.76639 6.2085C5.3978 6.2085 2.05719 7.95009 0.687373 11.6038C-1.0822 16.3143 0.554122 19.9973 5.7216 19.9973H5.72293Z"
              fill="currentColor"
            />
          </svg>
        </a>
        <Social content={{ items: socialItems }} vertical={false} />
      </div>
    </div>
  );
}

export default Menu;
