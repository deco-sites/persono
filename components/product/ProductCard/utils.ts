import { CustomTagColor, TagColor } from "deco-sites/persono/components/product/ProductCard/index.tsx";


export const generateColorObject = (customTagColors?: CustomTagColor[]) => {

    if(!customTagColors){
    return {}
    }

    const colorObject: TagColor = {};

    customTagColors?.forEach((item) => {
      colorObject[item.label] = {backGround:item.color.backGround,text:item.color.text};
    });

    return colorObject;
  };