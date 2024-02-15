export interface Size {
  size: string;
}

interface Props {
  sizes: Size[];
}

/** @title Sizes */
const loader = ({ sizes }: Props): Size[] => sizes;

export const Preview = ({ sizes }: Props) => {
  return (
    <div class="h-full w-full grid place-items-center">
      {sizes.map((c) => <p>{c.size}</p>)}
    </div>
  );
};

export default loader;
