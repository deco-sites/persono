/**
 * @title {{{name}}}
 */

export interface SizeGuide {
  /**
   * @description Size
   */
  name: string;
  /**
   * @description Size and the size measurement
   */
  value: string;
}

/**
 * @title {{{category}}}
 */
export interface SizeGuideGroup {
  /**
   * @description Category product name
   */
  category: string;
  /**
   * @description Sizes list of that category
   */
  size: SizeGuide[];
}

interface Props {
  sizesGuide: SizeGuideGroup[];
}

/** @title Sizes */
const loader = ({ sizesGuide }: Props): SizeGuideGroup[] => sizesGuide;

export const Preview = ({ sizesGuide }: Props) => {
  return (
    <div class="h-full w-full grid place-items-center">
      {sizesGuide.map((c) => {
        c.size.map((_s) => <p>s.sizeName</p>);
      })}
    </div>
  );
};

export default loader;
