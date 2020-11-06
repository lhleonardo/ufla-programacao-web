import { Car } from "./CarProvider";
import { v4 as uuid } from "uuid";
export const STATIC_CARS: Car[] = [
  {
    id: uuid(),
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    imageUrl:
      "https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/large-2479-s-classsaloon.jpg?itok=QTxMln2k",
  },
  {
    id: uuid(),
    brand: "Ford",
    model: "Ford Ka",
    year: 2020,
    imageUrl:
      "https://s2.glbimg.com/9XufU2Gc0q9D_X74qc0kmk0aZNw=/620x413/e.glbimg.com/og/ed/f/original/2015/12/01/novo-ford-ka.jpg",
  },
  {
    id: uuid(),
    brand: "Honda",
    model: "Honda Civic",
    year: 2020,
    imageUrl:
      "https://1.bp.blogspot.com/-ALo53OFsCJc/Xv5hNr1sfpI/AAAAAAAAfko/UniQjgxT8NocKIsVD065-Lra2250HNGIQCLcBGAsYHQ/s1600/Honda-Civic-Si-2021%2B%252834%2529.jpg",
  },
];
