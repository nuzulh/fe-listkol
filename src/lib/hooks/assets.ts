import { Assets, ImageAssets } from "../models";

const assets: Assets = {
  imageAssets: {
    "hero": require("@/assets/images/hero.svg"),
    "bg-dots": require("@/assets/images/bg-dots.svg"),
    "revenue": require("@/assets/images/revenue.svg"),
    "bar-chart": require("@/assets/images/bar-chart.svg"),
    "i-1": require("@/assets/images/i-1.svg"),
    "i-2": require("@/assets/images/i-2.svg"),
    "i-3": require("@/assets/images/i-3.svg"),
    "i-4": require("@/assets/images/i-4.svg"),
    "i-5": require("@/assets/images/i-5.svg"),
    "i-6": require("@/assets/images/i-6.svg"),
    "i-7": require("@/assets/images/i-7.svg"),
    "excel": require("@/assets/images/excel.svg"),
  },
};

export function useAssets() {
  const getImage = (key: keyof ImageAssets) => assets.imageAssets[key];

  return { getImage };
}
