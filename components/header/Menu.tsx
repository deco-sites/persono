import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import Social, {
  SocialItem,
} from "deco-sites/persono/components/footer/Social.tsx";
import { Logo } from "deco-sites/persono/components/ui/Logo.tsx";


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
  children?: Omit<SiteNavigationElement, "image">[];
}

export type FastLink = Omit<SiteNavigationElementLeaf, "image"> & {
  icon?: AvailableIcons;
};

export interface Props {
  /** @description Recomended to max of 2 children trees */
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
  "!py-4 !px-4 peer-checked:bg-base-300 peer-checked:border-b border-white",
  "!py-4 !px-8 bg-base-300",
];

function MenuItem(
  { item, child = 0 }: { item: SiteNavigationElement; child?: number },
) {
  const hasChildren = !!item.children?.length;
  return (
    <li
      class={`${
        hasChildren ? "collapse collapse-plus rounded-none" : ""
      } relative items-start`}
    >
      {hasChildren
        ? (
          <>
            <input type="checkbox" class="w-1/4 h-full justify-self-end peer" />
            <ul class="collapse-content !px-0 divide-y divide-white">
              {item.children?.map((node, index) => (
                <MenuItem key={index} item={node} child={child + 1} />
              ))}
            </ul>
          </>
        )
        : null}
      <div
        class={`${
          CHILD_TITLE[child]
        } collapse-title !pl-2 after:!w-5 after:!h-5 after:!static after:!leading-5 after:!text-center after:!text-2xl flex items-center justify-between`}
      >
        <a class={`${TEXT[child]} flex-grow`} href={item.url}>{item.label}</a>
      </div>
    </li>
  );
}

function Menu({ items = [], fastLinks = [], socialItems = [] }: Props) {
  return (
    <div class="flex flex-col h-full">
      <ul class="px-4 flex-grow flex flex-col divide-y divide-[#D4DBD7]">
        {items?.map((item) => <MenuItem item={item} />)}
      </ul>

      <ul class="px-4 flex flex-col py-2 bg-base-200">
        {fastLinks?.map((link) => (
          <li>
            <a
              class="flex items-center gap-2 p-4"
              href={link.url}
            >
              {link.icon
                ? <Icon id={link.icon} size={20} strokeWidth={2}  />
                : null}
              <span class="text-base font-normal">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
      <div class="bg-secondary text-secondary-content flex flex-row justify-between items-end flex-wrap pt-5 pb-6 px-4">
        <a
          href="https://deco.cx/"
          target="_blank"
          class="flex items-center gap-1 text-sm"
        >
          <Logo color ="white"/>
        </a>
        <Social content={{ items: socialItems }} vertical={false} />
      </div>
    </div>
  );
}

export default Menu;
