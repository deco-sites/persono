/**
 * @title {{{name}}}
 */

export interface Size {
  /**
   * @description Size
   */
  name: string;
  /**
   * @description Size and the size measurement
   */
  value: string;
}

interface Props {
  sizes: Size[];
}

/** @title Sizes */
const loader = ({ sizes }: Props): Size[] => sizes;

export const Preview = ({ sizes }: Props) => {
  return (
    <div class="h-full w-full grid place-items-center">
      {sizes.map((c) => <p>{c}</p>)}
    </div>
  );
};

export default loader;
