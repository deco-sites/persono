import { CustomTagColor, TagColor } from "deco-sites/persono/components/product/ProductCard/index.tsx";


export const generateColorObject = (customTagColors?: CustomTagColor[]) => {

    if(!customTagColors){
    return {}
    }

    const colorObject: TagColor = {};

    customTagColors?.forEach((item) => {
      
      colorObject[item.label] = {backgroundColor:item.backgroundColor,textColor:item.textColor};
    });

    return colorObject;
  };