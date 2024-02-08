import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Color {
  label: string;
  hex: string;
  ring: string;
  img?: ImageWidget;
}

interface Props {
  colors: Color[];
}

/** @title Colors */
const loader = ({ colors }: Props): Color[] => colors;

export const Preview = ({ colors }: Props) => {
  return (
    <div class="h-full w-full grid place-items-center">
      {colors.map((c) => (
        <p>{c.label}</p>
      ))}
    </div>
  );
};

export default loader;
