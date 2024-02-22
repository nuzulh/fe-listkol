import { Assets, ImageAssets } from "../models";

const assets: Assets = {
  imageAssets: {
    "hero": require("@/assets/images/hero.svg"),
    "bg-dots": require("@/assets/images/bg-dots.svg"),
    "revenue": require("@/assets/images/revenue.svg"),
    "bar-chart": require("@/assets/images/bar-chart.svg"),
  },
};

export function useAssets() {
  const getImage = (key: keyof ImageAssets) => assets.imageAssets[key];

  return { getImage };
}
