/**
 * @title {{{name}}}
 */

export interface Size {
  name: string;
  value: string;
}

/**
 * @title {{{category}}}
 */
export interface SizeGroup {
  category: string;
  size: Size[];
}

interface Props {
  sizes: SizeGroup[];
}

/** @title Sizes */
const loader = ({ sizes }: Props): SizeGroup[] => sizes;

export const Preview = ({ sizes }: Props) => {
  return (
    <div class="h-full w-full grid place-items-center">
      {sizes.map((c) => {
        c.size.map((s) => <p>s.sizeName</p>);
      })}
    </div>
  );
};

export default loader;
