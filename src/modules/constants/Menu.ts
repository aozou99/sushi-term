import _ from "lodash";

export const MenuMap: { [key: string]: { photo: string; price: number } } = {
  sushi: { photo: "🍣", price: 300 },
  agari: { photo: "🍵", price: 0 },
  oden: { photo: "🍢", price: 80 },
  ebifly: { photo: "🍤", price: 150 },
  beer: { photo: "🍺", price: 380 },
  sake: { photo: "🍶", price: 600 }
};
export const MenuPhotos = _.mapValues(MenuMap, menu => menu.photo);
export const MenuPrices = _.mapValues(MenuMap, menu => menu.price);
