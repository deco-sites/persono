import { ImageWidget } from "apps/admin/widgets.ts";

export interface Benefits {
  customAttribute: string | undefined;
  icon: ImageWidget;
  label: string;
  description: string;
  descriptionHome?: string;
  showInHome?: boolean;
}

interface Props {
  benefits: Benefits[];
}

/** @title Benefits */
const loader = ({ benefits }: Props): Benefits[] => benefits;

export const Preview = ({ benefits }: Props) => {
  return (
    <div class="h-full w-full grid place-items-center">
      {benefits.map((b) => (
        <p>{b.label}</p>
      ))}
    </div>
  );
};

export default loader;
