import { CustomTagColor } from "deco-sites/persono/components/product/ProductCard/index.tsx";


export const generateColorObject = (customTagColors?: CustomTagColor[]) => {

    if(!customTagColors){
    return {}
    }

    const colorObject: Record<string, string> = {};

    customTagColors?.forEach((item) => {
      colorObject[item.title] = item.color;
    });

    return colorObject;
  };