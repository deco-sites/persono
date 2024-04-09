export interface PriceLabel {
    /** @title Offer type */
    /** @description Ex: Range */
    offerType: string
     /** @title Label*/
     /** @description Ex: A partir de ${minPrice} */
    label: string
  }

interface Props {
    priceLabels: PriceLabel[];
}

/** @title Product card offers price labels */
const loader = ({ priceLabels }: Props): PriceLabel[] => priceLabels;

export const Preview = ({ priceLabels }: Props) => {
  return (
    <div class="h-full w-full grid place-items-center">
      {priceLabels.map((b) => <p>{b.label}</p>)}
    </div>
  );
};

export default loader;
